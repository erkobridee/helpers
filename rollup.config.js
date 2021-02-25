import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const browserLibraryName = 'Helpers';
const bundleEntryPoint = 'src/index.ts';
const outputDir = 'dist-pack';

export default [
  {
    input: bundleEntryPoint,
    output: [
      {
        file: `${outputDir}/bundle/esm.js`,
        format: 'es',
      },
      {
        file: `${outputDir}/bundle/cjs.js`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/helpers.js`,
        format: 'umd',
        name: browserLibraryName,
        export: 'named',
      },
      {
        file: `${outputDir}/helpers.min.js`,
        format: 'umd',
        name: browserLibraryName,
        export: 'named',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [typescript()],
  },
];
