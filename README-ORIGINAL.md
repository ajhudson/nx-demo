These instructions are based from NX's [integrated monorepo tutorial](https://nx.dev/getting-started/tutorials/integrated-repo-tutorial)...

1. Install PNPM by running a Powershell terminal `iwr https://get.pnpm.io/install.ps1 -useb | iex`

2. Install NX as a global tool `pnpm add nx -g`

3. Install NX workspace as a global tool `pnpm add create-nx-workspace -g`

4. Create a new PNPM workspace `pnpm init` and it will generate a new _package.json_

5. We can remove the _main_ and _scripts_ properties from the _package.json_ as this is in the root of the mono-repo and apps will have their own _package.json_

6. Run `pnpm create-nx-workspace my-monorepo --preset=core` to create a new folder called _my-monorepo_ which will have a boilerplate mono-repo set up within it

7. Run `cd my-monorepo` to go into the monorepo directory

8. Create a Typescript library by run `pnpm nx generate @nx/js:library is-even --directory=libs/is-even --publishable --importPath=@ajhudson/is-even` and follow the set-up wizard. This will create a new library and will generate a bunch of files including _project.json_ which is used by NX.

9. Note that _tsconfig.base.json_ has an entry for the newly created library

10. Running `pnpm nx test is-even` should run unit tests for the newly created library

11. Create a second Typescript library by running `pnpm nx g @nx/js:library is-odd --directory=libs/is-odd --publishable --importPath=@ajhudson/is-odd`

12. Once the library has been created, _tsconfig.base.json_ now has another entry in for the is-odd library

13. Running `pnpm nx run-many -t test` will run the tests for ALL libraries

14. Now we want to add a React app to the monorepo. Run `pnpm add -Dw @nx/react` followed by `pnpm exec nx g @nx/react:init` to install the plugin which will do this for us. Then run `pnpm nx list @nx/react` which will show you a lot of options on how we can create an app (e.g. component, storybook etc).

15. We perform a dry run of adding an application by running `pnpm dlx nx g @nx/react:app first-app --directory=apps/first-app` and follow the options (stylesheet, react router, test runner etc) in the set up wizard (you can also do a dry run with the `--dry-run` flag)

16. The React app is created in the _apps_ folder where you will find the _first-app_ React app and also a _first-app-e2e_ for cypress tests.

17. You can start the React app by running `pnpm nx serve first-app`

18. Now we'll create a button to use in our React app by creating a library for it to reside it, and therefore making it available for any future React apps we might add. We'll create our third library by running `pnpm nx g @nx/react:lib boring-label --directory=libs/boring-label --publishable --importPath=@ajhudson/boring-label` (again you can use the `--dry-run` flag before running the command properly)

19. This will create a boilerplate component for us. Now we can import it into our React app. Find _app.tsx_ in _first-app_ and then add the following at the top of the file:

```
import { BoringLabel } from '@ajhudson/boring-label'
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

---

# Appendix

[Removing a library or app from the NX workspace](https://nx.dev/nx-api/workspace/generators/remove#nxworkspaceremove) (`pnpm nx g @nx/workspace:remove <name of app/lib>`)

- This won't remove a component if it is still referenced by apps
