import { Get, ViewHandler, Controller, Cache } from "jshero-core";
import { PageService } from "../../services/pageService";
import { PageState } from "../../types";

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
    return fetch('https://dog.ceo/api/breeds/list/all').then(x => x.json())
  }
}