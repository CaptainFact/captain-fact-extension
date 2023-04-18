import { getVideoProvider } from './url_utils'

it('returns null for invalid urls', () => {
  // Mising id
  expect(getVideoProvider('https://youtu.be')).toBe(null)
  // Channel
  expect(
    getVideoProvider('https://www.youtube.com/channel/UCQgWpmt02UtJkyO32HGUASQ')
  ).toBe(null)
})

it('recognize youtube urls', () => {
  // Normal
  expect(
    getVideoProvider('https://www.youtube.com/watch?v=LMRdn_MQWXM')
  ).toEqual({ provider: 'youtube', providerId: 'LMRdn_MQWXM' })
  // Short
  expect(getVideoProvider('https://youtu.be/LMRdn_MQWXM')).toEqual({
    provider: 'youtube',
    providerId: 'LMRdn_MQWXM',
  })
  // Embedded
  expect(getVideoProvider('https://www.youtube.com/embed/LMRdn_MQWXM')).toEqual(
    { provider: 'youtube', providerId: 'LMRdn_MQWXM' }
  )
})
