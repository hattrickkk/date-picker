import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    webpackFinal: async config => {
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@constants': path.resolve(__dirname, '../src/constants'),
                '@components': path.resolve(__dirname, '../src/components'),
                '@ui': path.resolve(__dirname, '../src/ui'),
                '@utils': path.resolve(__dirname, '../src/utils'),
                '@styles': path.resolve(__dirname, '../src/styles'),
            }
        }
        return config
    },
}
export default config
