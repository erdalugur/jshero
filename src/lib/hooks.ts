export function useDocumentTitle (title: string) {
  if (process.env.BROWSER) {
    window.document.title = title
  }
}