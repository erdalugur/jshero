import { Get, ViewHandler } from "../../core";
import { PageState } from "../../types";

export class Controller {
  @ViewHandler()
  @Get()
  handler (): PageState {
    return {
      meta: {
        title: 'Home Page Title'
      },
      props: {}
    }
  }
}