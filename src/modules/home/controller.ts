import { ViewHandler } from "../../core";
import { PageState } from "../../types";

export class Controller {
  @ViewHandler()
  handler (): PageState {
    return {
      meta: {
        title: 'Home Page Title'
      },
      props: {}
    }
  }
}