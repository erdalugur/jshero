import { Get, ViewHandler, Controller } from "jshero-core";
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

  @Get('/dogs')
  async getDogsData() {
    return fetch(process.env.JSHERO_DOGS_URL).then(x => x.json())
  }
}