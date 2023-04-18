import React from 'react'
import renderer from 'react-test-renderer'
import Select from './Select.js'

describe('ON/OFF options', () => {
  const options = { ON: true, OFF: false }

  test('render with 1st option selected', () => {
    expect(
      renderer
        .create(<Select name="videosOverlay" selected options={options} />)
        .toJSON()
    ).toMatchInlineSnapshot(`
      <div
        className="select"
      >
        <a
          className="button active"
          data-value="ON"
          onClick={[Function]}
        >
          ON
        </a>
        <a
          className="button"
          data-value="OFF"
          onClick={[Function]}
        >
          OFF
        </a>
      </div>
    `)
  })

  test('render with second option selected', () => {
    expect(
      renderer
        .create(
          <Select name="videosOverlay" selected={false} options={options} />
        )
        .toJSON()
    ).toMatchInlineSnapshot(`
      <div
        className="select"
      >
        <a
          className="button"
          data-value="ON"
          onClick={[Function]}
        >
          ON
        </a>
        <a
          className="button active"
          data-value="OFF"
          onClick={[Function]}
        >
          OFF
        </a>
      </div>
    `)
  })
})
