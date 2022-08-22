import BaseModule from "./Base"
import glob from "glob"

class APIModule extends BaseModule {
  namespace: string = "API"
  init() {
    console.log("API module initialized")
    this.serverConnection()
  }

  async serverConnection() {
    try {
      const routes = glob.sync("**/api/routes/**/*.ts")

      for (const page of routes) {
        const content = await import(page)
        if (content.default) {
          const method = new content.default()
          console.log(method.html)
        }
      }
    } catch (error) {
      console.error("Error connecting to server ", error)
    }
  }
}

declare namespace APIModule {}

export default APIModule
