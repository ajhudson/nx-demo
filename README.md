# NX Demo

There are two kinds of [monorepo structure](https://nx.dev/concepts/integrated-vs-package-based):

- Package-based: Each app or library have their own set of dependencies
- Integrated: Each app or library have a single version of every dependency

For a mono-repo, we're interested in the _integrated repo_ so that every app/library uses the same version of a shared React component.

This tutorial is based from NX's [integrated monorepo tutorial](https://nx.dev/getting-started/tutorials/integrated-repo-tutorial).

[pnpm](https://pnpm.io/) will be used as the package manager. In the tutorial steps below, you could substitute `pnpm <command>` with [pnpm dlx](https://pnpm.io/cli/dlx) to hotload a package without installing it, so it's the equivalent of NPM's `npx` command.

When following this tutorial, ensure it is in a folder which has been initialised as a git repo.

1. Install PNPM by running a Powershell terminal `iwr https://get.pnpm.io/install.ps1 -useb | iex`

2. Install NX as a global tool `pnpm add nx -g`

3. Verify global tools are installed with `pnpm list -g`

4. Create a new PNPM workspace `pnpm init` and it will generate a new _package.json_. We can remove the _main_ and _scripts_ properties from the _package.json_ as this is in the root of the mono-repo and apps will have their own _package.json_.

5. Run `pnpm create-nx-workspace my-monorepo --preset=core` to create a new folder called _my-monorepo_ which will have a boilerplate mono-repo set up within it (say _yes_ to "Enable distributed caching" and at the end there is an access token which is used for remote caching)

6. Run `cd my-monorepo` to go into the monorepo directory

7. Now we want to add a React app to the monorepo. Run `pnpm add -Dw @nx/react` followed by `pnpm exec nx g @nx/react:init` to install the plugin which will do this for us. Then run `pnpm nx list @nx/react` which will show you a lot of options on how we can create an app (e.g. component, storybook etc).

8. We can add an application by running `pnpm nx g @nx/react:app first-app --directory=apps/first-app` and follow the options (stylesheet, react router, test runner etc) in the set up wizard. The app will be created along with an _e2e_ project.

9. We can run _first-app_ with `pnpm nx serve first-app` (should run port 4200)

10. Add a second app with `pnpm nx g @nx/react:app second-app --directory=apps/second-app`

11. We can run _second-app_ with `pnpm nx serve second-app`. Watch out that the port number generated is also 4200, the same as _first-app_ but you can change it by modifying [second-app/project.json](./my-monorepo/apps/second-app/project.json) and a `port` property in _targets > serve > options_ as per the [instructions on this blog](https://medium.com/@donald.murillo07/how-to-change-the-default-port-for-any-nx-project-with-2-simple-tricks-c02b0741b9b3). You can also simply run `pnpm nx serve second-app --port=4201`.

12. We can run multiple apps at the same time with `pnpm nx run-many -t serve`

13. We have two apps and we can build them concurrently with `pnpm nx run-many -t build`

14. If we run the same command again, it will be much quicker because of the caching. This is stored in the _.nx/cache_ folder locally. For CI/CD pipelines, the cache is stored remote at https://cloud.nx.app.

15. Check in the current state of the repo with `git add .` and `git commit -m "initial commit"`, then make a minor change to one of the apps. Running `pnpm nx show projects --affected` should show what has changed. Adding the `--json` flag will print out the result in a different format.

16. We will now add a React component that can be used in both apps with `pnpm nx g @nx/react:lib boring-label --directory=libs/boring-label --publishable --importPath=@my-monorepo/boring-label` (afterwards you can check _tsconfig.base.json_ to see the new component registered)

17. This will create a boilerplate component for us. Now we can import it into our React app. Find _app.tsx_ in _first-app_ and then add the following at the top of the file:

```
import { BoringLabel } from '@my-monorepo/boring-label'
```

and then place the component somewhere in the _App_ component:

```
export function App() {
  return (
    <StyledApp>
      <BoringLabel />
      ...
    </StyledApp>
```

The app should render the label showing we can easily add components that can be shared amongst other apps.

18. Repeat the previous step for _second-app_.

19. Commit the repo into git in its current state.

20. If you now run `pnpm nx show projects --affected --uncommitted` it should return nothing as there are no new changes. But if you make a small change to the [boring-label.tsx](./my-monorepo/libs/boring-label/src/lib/boring-label.tsx) it will show that _boring-label_ has indeed changed. However, what we really want is to show the altered component AND it's dependencies as then we can tell the CI/CD pipeline which applications it needs to deploy. So we need to find [nx.json](./my-monorepo/nx.json) and add the following as per [these instructions](https://nx.dev/core-tutorial/05-auto-detect-dependencies):

```
{
    ...
    "pluginsConfig": {
            "@nx/js": {
            "analyzeSourceFiles": true
        }
    }
    ...
}
```

21. If we re-run `pnpm nx show projects --affected --uncommitted` then we will see the _boring-label_ and also the apps that use it.

22. If we run `pnpm nx show projects --affected --uncommitted -t serve` then we can ignore the end-to-end tests from the resulting output. So we've changed a shared component but NX can work out which apps rely on it.

23. By running `pnpm nx graph` then NX will spin up a web server and render a dependency graph too.
