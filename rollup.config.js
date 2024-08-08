import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { resolve } from 'path'
import { defineConfig } from 'rollup'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
    input: ['./src/index.ts'],
    external: ['react', 'react-dom'],
    output: [
        {
            dir: 'lib',
            format: 'esm',
            preserveModules: true,
            preserveModulesRoot: 'src',
            exports: 'named',
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolvePlugin(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        typescript({
            useTsconfigDeclarationDir: true,
        }),

        alias({
            resolve: ['.jsx', '.js', '.tsx', '.ts'],
            entries: [
                { find: '@components', replacement: resolve(__dirname, 'src/components') },
                { find: '@ui', replacement: resolve(__dirname, 'src/ui') },
                { find: '@constants', replacement: resolve(__dirname, 'src/constants') },
                { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
                { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
                { find: '@customTypes', replacement: resolve(__dirname, 'src/customTypes') },
            ],
        }),
        isDev ? null : terser(),
    ],
})
