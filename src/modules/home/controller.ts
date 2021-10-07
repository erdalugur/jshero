import { Get, ViewHandler, Controller } from "jshero-core";
import { PageService } from "../../services/pageService";
import { PageState } from "../../types";

@Controller()
export class HomeController {
  constructor(
    private pageService: PageService
  ){}
  @ViewHandler()
  @Get()
  async handler (): Promise<PageState> {
    return this.pageService.getPageData('home') as Promise<PageState>
  }
}