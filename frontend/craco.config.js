const path = require('path')
const fs = require('fs')
const cracoBabelLoader = require('craco-babel-loader')

// Handle relative paths to sibling packages
const appDirectory = fs.realpathSync(process.cwd())
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath)
const CracoAlias = require("craco-alias");

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./",
        tsConfigPath: "./tsconfig.paths.json"
      }
    },
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [
          // No "unexpected token" error importing components from these lerna siblings:
          resolvePackage('../shared'),
        ],
      },
    }
  ]
}