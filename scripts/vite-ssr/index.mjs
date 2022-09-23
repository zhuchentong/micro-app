import * as fs from 'fs';
import * as path from 'path';

const vite_ssr_package_path = path.resolve(
  process.cwd(),
  'node_modules',
  'vite-ssr',
);

const package_json_path = path.resolve(vite_ssr_package_path, 'package.json');
const dev_server_path = path.resolve(vite_ssr_package_path, 'dev', 'server.js');

/**
 * 修复package.json/exports
 */
async function fixedPackageJSON() {
  const json = fs.readFileSync(package_json_path);
  const data = JSON.parse(json);

  data.exports = {
    './plugin': './plugin.js',
    './dev': './dev/index.js',
    './*': './*',
  };

  fs.writeFileSync(package_json_path, JSON.stringify(data), {
    encoding: 'utf-8',
  });
}

/**
 * 修复dev server handler
 */
async function fixedServerHandler() {
  const content = fs.readFileSync(dev_server_path, { encoding: 'utf-8' });
  const data = content.replace(
    "if (request.method !== 'GET' || request.originalUrl === '/favicon.ico')",
    "if (request.method !== 'GET' || request.originalUrl === '/favicon.ico' ||  request.originalUrl === '/sw.js')",
  );

  fs.writeFileSync(dev_server_path, data, { encoding: 'utf-8' });
}

fixedPackageJSON();
fixedServerHandler();
