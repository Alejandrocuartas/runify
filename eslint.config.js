// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals'; // Import globals

export default tseslint.config( // Use tseslint.config for convenience
    eslint.configs.recommended,
    ...tseslint.configs.recommended, // Add TypeScript recommended rules
    { // Configuration for React
        files: ['**/*.{jsx,tsx}'], // Apply only to JSX/TSX files
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true }, // Enable JSX parsing
            },
            globals: { // Add browser globals
                ...globals.browser,
            }
        },
        rules: {
            ...reactPlugin.configs.recommended.rules, // Add React recommended rules
            ...reactHooksPlugin.configs.recommended.rules, // Add React Hooks recommended rules
            'react/react-in-jsx-scope': 'off', // Optional: Off if using React 17+ new JSX transform
            'react/prop-types': 'off', // Optional: Off since we use TypeScript for types
            indent: ['error', 4],
            '@typescript-eslint/no-explicit-any': 'off',
        },
        settings: { // Add React version setting
            react: {
                version: 'detect', // Automatically detect React version
            },
        },
    },
    { // Configuration for CommonJS files (.cjs)
        files: ['**/*.cjs'],
        languageOptions: {
            globals: { // Define Node.js globals for CJS files
                ...globals.node, // Includes require, module, __dirname, etc.
            },
        },
        rules: {
            // Disable rules that conflict with CommonJS
            '@typescript-eslint/no-var-requires': 'off', // Allow require()
            '@typescript-eslint/no-require-imports': 'off', // Allow require() style imports
            'no-undef': 'off', // Allow Node.js globals like require, module, __dirname
        },
    },
    { // Global rules (like indentation)
        rules: {
            indent: ['error', 4],
        },
    },
    { // Files to ignore
        ignores: [
            'webpack.config.js',
            'dist/', // Example: ignore build output directory
            'node_modules/', // Standard practice
            'tailwind.config.js',
            'docs/',
        ],
    }
); 