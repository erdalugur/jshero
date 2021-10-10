export interface PageState {
  meta: {
    title: string
  },
  props: any
}

export interface AppState {
  home: PageState
}
export interface CreateAppOptions {
  bootstrap: object
}