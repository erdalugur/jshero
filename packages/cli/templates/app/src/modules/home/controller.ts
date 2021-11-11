import { Get, ViewHandler, Controller, Cache } from "jshero-core";
import { HomeState } from "./model";

@Controller()
export class HomeController {

  @ViewHandler()
  @Get()
  async handler (): Promise<HomeState> {
    return {
      title: 'JsHero'
    }
  }

  @Cache('dogs', 60) // cached 1 min
  @Get('/dogs')
  getDogsData() {
    return fetch(process.env.JSHERO_DOGS_URL).then(x => x.json())
  }
}