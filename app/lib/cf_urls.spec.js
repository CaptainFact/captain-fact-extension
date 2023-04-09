import { linkToAddVideo, linkToVerificationsPage } from './cf_urls'

test('linkToAddVideo', () => {
  expect(
    linkToAddVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  ).toMatchInlineSnapshot(
    `"http://TEST_FRONTEND/videos/add?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ"`
  )
})

test('linkToVerificationsPage', () => {
  expect(linkToVerificationsPage('xxxx')).toMatchInlineSnapshot(
    `"http://TEST_FRONTEND/videos/xxxx"`
  )
})
