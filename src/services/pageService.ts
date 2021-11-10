export class PageService {
  private readonly pageMock: Record<string, any> = {
    'home': {
      title: 'JSHERO'
    }
  }

  public async getPageData<T>(page: string): Promise<T> {
    return this.pageMock[page]
  }
}