module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    plugins: [
        'react',
        "import"
    ],
    'rules': {
        'consistent-return': 'off',
    },
    "parser": "babel-eslint",
}