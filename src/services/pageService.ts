export class PageService {
  private readonly pageMock: Record<string, any> = {
    'home': {
      meta: {
        title: 'Home Page Title'
      },
      props: {}
    }
  }

  public async getPageData(page: string): Promise<unknown> {
    return this.pageMock[page]
  }
}