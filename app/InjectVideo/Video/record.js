import { Record, List } from "immutable"


const Video = new Record({
  id: 0,
  posted_at: 0,
  url: "",
  provider: "",
  provider_id: "",
  title: "",
  speakers: new List()
})

export default Video