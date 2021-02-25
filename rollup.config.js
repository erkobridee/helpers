/*
  https://rollupjs.org/
  https://devhints.io/rollup
*/

import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

//----------------------------------------------------------------------------//

const isString = (value) => value && typeof value === 'string';
const capitalize = (value) =>
  !isString(value) ? '' : value.replace(/^\w/, (c) => c.toUpperCase());

const libraryName = 'helpers';
const outputDir = 'dist-pack';
const bundleDir = 'dist';
const declarationDir = 'types';
const bundleEntry = 'src/index.ts';
const moduleEntries = ['src/sample1/index.ts', 'src/sample2/index.ts'];

const browserLibraryName = capitalize(libraryName);

const tsPluginConfig = {
  useTsconfigDeclarationDir: true,
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationDir: `${outputDir}/${declarationDir}`,
      sourceMap: true,
    },
  },
};

const rollupCommonPlugins = [
  resolve(),
  commonjs(),
  json(),
  typescript(tsPluginConfig),
];

const bundleConfig = {
  input: bundleEntry,
  output: [
    {
      file: `${outputDir}/${bundleDir}/esm.js`,
      format: 'esm',
    },
    {
      file: `${outputDir}/${bundleDir}/cjs.js`,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: `${outputDir}/${bundleDir}/umd.js`,
      format: 'umd',
      name: browserLibraryName,
      exports: 'named',
    },
    {
      file: `${outputDir}/${bundleDir}/umd-dev.js`,
      format: 'umd',
      name: browserLibraryName,
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `${outputDir}/${bundleDir}/umd.min.js`,
      format: 'umd',
      name: browserLibraryName,
      exports: 'named',
      plugins: [terser()],
    },
    {
      file: `${outputDir}/${bundleDir}/umd-dev.min.js`,
      format: 'umd',
      name: browserLibraryName,
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: rollupCommonPlugins,
};

// https://rollupjs.org/guide/en/#outputpreservemodulesroot
const modulesConfig = {
  input: moduleEntries,
  output: {
    format: 'es',
    dir: outputDir,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: rollupCommonPlugins,
};

export default [bundleConfig, modulesConfig];
