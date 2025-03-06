# Installation instructions

- Add this repository as a project dependency
```sh
git submodule add 'https or git repository link' packages/@beda.software/mobile-item-controls/
```
- Update your project `package.json` with `yarn` workspaces configuration
```json
{
    ...,
    "private": true,
    "workspaces": [
        "packages/@beda.software/mobile-item-controls"
    ],
    "dependencies": {
        ...,
        "@beda.software/mobile-item-controls": "1.0.0",
        ...
    }
}
```
Note that CRA-based applications do not allow ts or tsx to be transpilled outside of the `src` folder, so the workspace package might need to be installed under `src/packages/@beda.software/mobile-item-controls` instead.
- Link workspace as a project dependency
```sh
yarn install
```

Please refer to the official `yarn` documentation for additional details on [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/) usage.

# Development

Make sure global dependencies (like `react`) are defined as peer-dependencies.

`yarn workspace @beda.software/mobile-item-controls cmd` can be used while in a root project to manage submodule dependecies (when needed).

# Usage

