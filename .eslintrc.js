module.exports = {
  root: true,
  env: {
		node: true,
    es6: true,
	},
  parser: 'babel-eslint',
  extends: [
		'eslint:recommended',
		'airbnb',
		'plugin:prettier/recommended',
	],
  plugins: [
		'prettier',
	],
	rules: {
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'ignore',
		}],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	}
}
