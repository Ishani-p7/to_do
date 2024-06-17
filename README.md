# React + Vite
[vite-plugin-react-pages](https://vitejs.github.io/vite-plugin-react-pages) (vite-pages) is a React app framework powered by [vite](https://github.com/vitejs/vite).

### Initialize a demo project locally

1. Initialize a vite-pages project (with npm 7+):
   - execute `npm init vite-pages app-demo -- --template app` to initialize an app project, or
   - execute `npm init vite-pages library-demo -- --template lib` to initialize a library project, or
   - execute `npm init vite-pages library-monorepo-demo -- --template lib-monorepo` to initialize a library project with monorepo setup.
   - If you are using **npm 6.x**, the extra double-dash before `--template` should be deleted. For example, `npm init vite-pages app-demo --template app`.
2. `npm install`
3. `npm run dev` and open with the local dev environment.



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
