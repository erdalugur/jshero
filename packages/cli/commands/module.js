const fs = require('fs')
const path = require('path')
const { success, makeNames, resolveProject } = require('../utils')
const templates = require('../templates')
/**
 * 
 * @param {{name:string}} param0 
 */
function createModule ( { name, template = 'app'}) {
	const { lowerCaseName } = makeNames(name)
	const projectRoot = path.resolve(process.cwd())
	if (fs.existsSync(projectRoot)) {
		const module = path.join(projectRoot, `/src/modules/${lowerCaseName}`)
		if (fs.existsSync(module)) {
			console.log(`${name} already exists`)
			return
		}
		fs.mkdirSync(module)
		const fileNames = ['controller.ts', 'index.ts', 'model.ts', 'styles.css', 'view.tsx']
		if (template === 'redux') {
			fileNames.push('reducer.ts')
		}
		
		fileNames.forEach(key => {
			const action = key.split('.')[0]
			fs.writeFileSync(`${module}/${key}`, templates[action](name))
		})
		success('module created successfully')
	}else {

	}
}
module.exports = createModule