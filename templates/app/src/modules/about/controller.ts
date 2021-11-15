import { ViewHandler, Get, Controller } from 'jshero-core'
import { AboutState } from './model'

@Controller()
export class AboutController {
  @ViewHandler()
  @Get()
  async handler (): Promise<AboutState>  {
    return {
      title: 'About'
    }
  }
}