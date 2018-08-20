const fs = require('fs')
const ChromeExtension = require('crx')
const resolve = require('path').resolve
const argv = require('minimist')(process.argv.slice(2))

// Constants
const BUILD_DIR = './build'
const EXPORT_NAME = 'CaptainFact_Extension'
const DEFAULT_APP_ID = 'fnnhlmbnlbgomamcolcpgncflofhjckm'

const keyPath = argv.key || 'key.pem';
const existsKey = fs.existsSync(keyPath)
const crx = new ChromeExtension({
  appId: argv['app-id'] || DEFAULT_APP_ID,
  codebase: argv.codebase,
  privateKey: existsKey ? fs.readFileSync(keyPath) : null
})

crx
  .load(resolve(BUILD_DIR))
  .then(ext => {
    console.log('Loading WebExtension...')
    return {
      archivePromise: ext.loadContents(),
      crxPromise: existsKey ? ext.pack() : null
    }
  })
  .then(({archivePromise, crxPromise}) => {
    // Build zip
    console.log(`Zip result to ${EXPORT_NAME}.zip`)
    archivePromise.then(archiveBuffer => {
      fs.writeFile(`${EXPORT_NAME}.zip`, archiveBuffer, null, (x) => {
        console.info(`${EXPORT_NAME}.zip successfully built`)
      })
    })

    // Build crx
    if (crxPromise) {
      console.log(`Copy export to ${EXPORT_NAME}.crx`)
      crxPromise.then(crxBuffer => {
        fs.writeFile(`${EXPORT_NAME}.crx`, crxBuffer, () => {
          console.info(`${EXPORT_NAME}.crx successfully built`)
        })
      })
    }
  })
  .catch(e => console.error(e))
