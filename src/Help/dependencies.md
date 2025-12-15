# What are Dependencies?

## How to add dependencies

If you have a package on GitHub, you can add and install it to your Node.js project via Yarn with the following `add` command:

```bash
yarn add https://github.com/username/my-npm-module.git
```

- `https://`: Tells `add` to connect securely to a `.git` URL.
- `://git@github.com`: Base URL for Github repos.
- `/username`: Enter the specific username of the repo.
- `/my-npm-module.git`: Enter the name of the repo appended with `.git`

```bash
yarn add file:///Users/calindgr/Documents/Development/modules/JS/tiny-tfidf
```

### Important notes about adding from Gtihub

- **Where is the module installed?**: Because Yarn treats the module as any other dependency, Yarn installs it to your local `node_modules/` directory.
- **How can I reinstall or update the module?**: Due to the above situation, if you make changes to the module on Github, such changes won’t be reflected in the installed version in your project. Additionally, Yarn caches modules, whether local, from Github, or from NPM itself. can force a re-install with the following commands:

```bash
// Remove the package and clean local cache
yarn remove my-npm-mdule
yarn cache clean

// Re-install it
yarn add git+ssh://git@github.com/username/my-npm-module.git
```