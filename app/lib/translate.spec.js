import translate from "./translate"


test('call chrome translate API', () => {
  const testStr = 'Please translate that!'
  translate(testStr)
  expect(chrome.i18n.getMessage).toHaveBeenCalledWith(testStr)
})
