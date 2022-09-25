const fs = require("fs");
const path = require("path");

const TYPE_FILE_DIR = "./src/types";

const checkTypeScript = () => {
  const typeFiles = fs
    .readdirSync(path.resolve(TYPE_FILE_DIR))
    .map((file) => `${TYPE_FILE_DIR}/${file}`);

  return (filenames) => {
    const files = [...filenames, ...typeFiles];
    return `tsc-files ${files.join(" ")} --noEmit --esModuleInterop`;
  };
};

module.exports = {
  "**/*.{ts,tsx}": [checkTypeScript(), "eslint --cache --fix"],
  "**/*.{js,jsx}": ["eslint --cache --fix"],
  "**/*.vue": ["eslint --cache --fix"],
  "**/*.{css,less,scss}": ["stylelint --cache --fix"],
};
