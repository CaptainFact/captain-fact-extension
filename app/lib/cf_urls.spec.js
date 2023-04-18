import { linkToVerificationsPage } from './cf_urls'

test('linkToVerificationsPage', () => {
  expect(linkToVerificationsPage('xxxx')).toMatchInlineSnapshot(
    `"http://TEST_FRONTEND/videos/xxxx"`
  )
})
