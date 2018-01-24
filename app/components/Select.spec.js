import Select from './Select.js'


test("render selected option", () => {
  snapshot(<Select name="videosOverlay" selected={true} options={{"ON": true, "OFF": false}}/>)
  snapshot(<Select name="videosOverlay" selected={false} options={{"ON": true, "OFF": false}}/>)
})
