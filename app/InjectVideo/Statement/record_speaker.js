import { Record } from "immutable"


const Speaker = new Record({
  id: 0,
  full_name: "",
  title: "",
  picture: "",
  is_user_defined: undefined
})

export default Speaker