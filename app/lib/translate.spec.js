import { BrowserExtension } from './browser-extension'
import translate from './translate'

test('call chrome translate API', () => {
  const testStr = 'Please translate that!'
  translate(testStr)
  expect(BrowserExtension.i18n.getMessage).toHaveBeenCalledWith(testStr)
})
