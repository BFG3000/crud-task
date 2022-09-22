// gulpfile.js
"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin-legacy');
build.addSuppression(
  /Warning - \[sass\] The local CSS class .* is not camelCase and will not be type-safe./gi
);

// force use of projects specified typescript version
const typeScriptConfig = require("@microsoft/gulp-core-build-typescript/lib/TypeScriptConfiguration");
typeScriptConfig.TypeScriptConfiguration.setTypescriptCompiler(
  require("typescript")
);

// force use of projects specified react version
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.externals = generatedConfiguration.externals.filter(
      (name) => !["react", "react-dom"].includes(name)
    );
    generatedConfiguration.plugins.forEach((plugin, i) => {
      if (plugin.options && plugin.options.mangle) {
        generatedConfiguration.plugins[i] = new TerserPlugin();
      }
    });
    return generatedConfiguration;
  },
});

build.initialize(gulp);
