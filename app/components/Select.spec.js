import React from 'react'
import Select from './Select.js'

test('render selected option', () => {
  const options = { ON: true, OFF: false }
  snapshotComponent(<Select name="videosOverlay" selected options={options} />)
  snapshotComponent(
    <Select name="videosOverlay" selected={false} options={options} />
  )
})
