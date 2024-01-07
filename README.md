# NX Demo

There are two kinds of [monorepo structure](https://nx.dev/concepts/integrated-vs-package-based):

- Package-based: Each app or library have their own set of dependencies
- Integrated: Each app or library have a single version of every dependency

For a mono-repo, we're interested in the _integrated repo_ so that every app/library uses the same version of a shared React component.

This tutorial is based from NX's [integrated monorepo tutorial](https://nx.dev/getting-started/tutorials/integrated-repo-tutorial).

[pnpm](https://pnpm.io/) will be used as the package manager. In the tutorial steps below, you could substitute `pnpm <command>` with [pnpm dlx](https://pnpm.io/cli/dlx) to hotload a package without installing it, so it's the equivalent of NPM's `npx` commad.

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

12. We have two apps and we can build them concurrently with `pnpm nx run-many -t build`

13. If we run the same command again, it will be much quicker because of the caching. This is stored in the _.nx/cache_ folder locally. For CI/CD pipelines, the cache is stored remote at https://cloud.nx.app.

14. Check in the current state of the repo.
