const eslintCmd = 'npm run ci:lint';

const formatCmd = 'npm run ci:format';

const stylelintCmd = 'npm run ci:stylelint';

const config = {
  '*.{ts,js,cjs,mjs,css}': [formatCmd],
  '*.{ts,tsx,js,cjs,mjs}': [eslintCmd],
  '*.css': [stylelintCmd],
};

export default config;
