### Issue: webpack-obfuscator plugin is not generating sourcemaps

The plugin is not generating sourcemaps with the config provided in 
`webpack.original.js` and `webpack.common.js`.

I've managed to trace the issue, and it seems like with the compilation 
stage that the Plugin is currently using does not provide sourcemaps for input assets.

Snippet from `webpack-obfuscator/plugin/index.ts`:
```typescript
    private extractSourceAndSourceMap(asset: any): { inputSource: string, inputSourceMap: RawSourceMap } {
        if (asset.sourceAndMap) {
            const { source, map } = asset.sourceAndMap();
            return { inputSource: source, inputSourceMap: map };
        } else {
            return {
                inputSource: asset.source(),
                inputSourceMap: asset.map()
            }
        }
    }
```

With the current compilation stage of `PROCESS_ASSETS_STAGE_SUMMARIZE`,
the return value of `inputSourceMap` is always null. This means that the
plugin never merges the sourcemaps generated during obfuscation with the input
sourcemaps.

If the compilation stage is changed to `PROCESS_ASSETS_STAGE_DEV_TOOLING`,
then `inputSourceMaps` is defined, sourcemaps are merged as expected and 
correct (usable) `.map` files are written to the output directory.

This is what I've done in the forked `LavaTile/webpack-obfuscator` repository 
(used in `webpack.patched.js`, note that the installation depends on a 
postinstall step to build the library)

Outputs of both original and patched version of the library can be found in `dist/`
and validated using https://sokra.github.io/source-map-visualization/#custom
