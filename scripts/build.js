const tasks = require('./tasks');
const argv = require('yargs').argv;

tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('build', argv.env);

console.log('[Webpack Build]');
console.log('-'.repeat(80));
exec("webpack --config webpack/build.config.js --progress --profile --colors --env=" + argv.env);
