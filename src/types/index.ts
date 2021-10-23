import { HomeState } from "modules/home/model";

export interface PageState <T> {
  meta: {
    title: string
  },
  props: T
}

export interface AppState {
  home: PageState<HomeState>
}