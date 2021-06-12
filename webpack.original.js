const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');

module.exports = merge(common, {
  plugins: [
    new WebpackObfuscator ({
      optionsPreset: 'low-obfuscation',
      seed: 1,
      log: true,
      transformObjectKeys: false,
      controlFlowFlattening: false,
      debugProtection: false,
      debugProtectionInterval: false,
      selfDefending: false,
      disableConsoleOutput: false,

      sourceMap: true,
      // sourceMapMode: 'inline',
      sourceMapMode: 'separate',
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/original'),
    assetModuleFilename: 'assets/[name][ext]',
  },
});
