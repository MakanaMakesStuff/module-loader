import { glob } from "glob"

async function loadModules() {
  const modules = glob.sync("**/modules/*.ts", {
    ignore: ["**/modules/Base.ts"],
  })

  await Promise.all(
    modules.map(async (module) => {
      const method = await import(module)

      if (!method.default) throw new Error(`${module} is not a module`)

      const action = new method.default()

      action.init()
    })
  )
}

async function start() {
  console.log("loading modules...")
  await loadModules()
}

start()
