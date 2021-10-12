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
    console.log("handler", new Date())
    return this.pageService.getPageData<PageState>('home')
  }

  @Cache('yeop', 60)
  @Get('/yeop')
  getCachedData() {
    console.log("/yeop", new Date())
    return "yeop data"
  }
}