import { linkToAddVideo, linkToVerificationsPage } from './cf_urls'


test('linkToAddVideo', () => {
  snapshot(linkToAddVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))
})

test('linkToVerificationsPage', () => {
  snapshot(linkToVerificationsPage('xxxx'))
})
