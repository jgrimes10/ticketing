module.exports = {
    parser: '@typescript-eslint/parser', // specifies the ESLint parser
    env: {
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2021, // allows for the parsing of modern ECMAScript features
        sourceType: 'module', // allows for the use of imports
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended', // uses the recommended rules from the eslint-plugin
        'plugin:@typescript-eslint/eslint-recommended', // uses the recommended rules from the @typescript-eslint/eslint-recommended-plugin
        'plugin:@typescript-eslint/recommended', // uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier', // uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier; this will display prettier errors as ESLint errors; make sure this is always the last configuration in the extends array
    ],
    rules: {
        // place to specify ESLint rules
        // can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
};
