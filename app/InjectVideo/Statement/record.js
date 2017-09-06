import { Record, List } from "immutable"
import Speaker from './record_speaker'


const Statement = new Record({
  id: 0,
  text: "",
  time: 0,
  speaker: new Speaker(),
  comments: new List()
})

export default Statement