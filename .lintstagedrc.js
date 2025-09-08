import { relative } from 'path';
 
const buildEslintCommand = (filenames) =>
{return `next lint --fix --file ${filenames
  .map((f) => {return relative(process.cwd(), f);})
  .join(' --file ')}`;};
 
const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};

export default lintStagedConfig;
