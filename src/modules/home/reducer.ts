import { PageState } from "types"
import { HomeState } from "./model"

const initialState: PageState<HomeState> = {
  meta: {
    title: ''
  },
  props: {}
}
export function reducer (state = initialState, action: any){
  return state
}