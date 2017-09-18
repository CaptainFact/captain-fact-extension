const fs = require('fs');
const ChromeExtension = require('crx');
const resolve = require('path').resolve
const name = require(resolve('./build/manifest.json')).name;
const argv = require('minimist')(process.argv.slice(2));

const keyPath = argv.key || 'key.pem';
const existsKey = fs.existsSync(keyPath);
const crx = new ChromeExtension({
  appId: argv['app-id'] || "fnnhlmbnlbgomamcolcpgncflofhjckm",
  codebase: argv.codebase,
  privateKey: existsKey ? fs.readFileSync(keyPath) : null
});

crx
  .load(resolve('./build'))
  .then(ext => ({
    archivePromise: ext.loadContents(),
    crxPromise: existsKey ? ext.pack() : null
  }))
  .then(({archivePromise, crxPromise}) => {
    // Build zip
    archivePromise.then(archiveBuffer => {
      fs.writeFile(`${name}.zip`, archiveBuffer);
      console.log(`${name}.zip successfully built`)
    })
    // Build crx
    if (crxPromise)
      crxPromise.then(crxBuffer => {
        fs.writeFile(`${name}.crx`, crxBuffer);
        console.log(`${name}.crx successfully built`)
      })
  }).catch(e => console.error(e));

