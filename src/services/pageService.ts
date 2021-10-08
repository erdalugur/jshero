export class PageService {
  private readonly pageMock: Record<string, any> = {
    'home': {
      meta: {
        title: 'Home Page Title'
      },
      props: {}
    }
  }

  public async getPageData<T>(page: string): Promise<T> {
    return this.pageMock[page]
  }
}