export class InMemoryDataBase {
  private providers: Map<string, any> = new Map()

  resolve<T> (key: string): T | undefined{
    return this.providers.get(key)
  }

  provide <T> (key: string, value:T) {
    return this.providers.set(key, value)
  }

  remove (key:string) {
    return this.providers.delete(key)
  }
}

export const inMemoryDataBase = new InMemoryDataBase()