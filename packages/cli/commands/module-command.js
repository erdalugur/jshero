const fs = require('fs')
const path = require('path')
const { success, makeNames } = require('../utils')
const templates = require('../templates')
/**
 * 
 * @param {{name:string}} param0 
 */
function createModule ({ name }) {
	const { lowerCaseName } = makeNames(name)
	const projectRoot = path.resolve(process.cwd())
	if (fs.existsSync(projectRoot)) {
		const module = path.join(projectRoot, `/src/modules/${lowerCaseName}`)
		fs.mkdirSync(module)
		const fileNames = ['controller.ts', 'index.ts', 'model.ts','reducer.ts','style.ts', 'view.tsx']
		fileNames.forEach(key => {
			const action = key.split('.')[0]
			fs.writeFileSync(`${module}/${key}`, templates[action](name))
		})
		success('module created successfully')
	}
}

module.exports = {
	createModule
}