import { Get, ViewHandler, Controller, Cache } from "jshero-core";
import { PageState } from "types";
import { PageService } from "services/pageService";
@Controller()
export class HomeController {
  constructor(
    private pageService: PageService
  ){}

  @ViewHandler()
  @Get()
  async handler () {
    return this.pageService.getPageData<PageState>('home')
  }

  @Cache('dogs', 60) // cached 1 min
  @Get('/dogs')
  getDogsData() {
    return fetch(process.env.JSHERO_DOGS_URL).then(x => x.json())
  }
}