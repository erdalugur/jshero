const { makeNames } = require("../utils")
module.exports = {
  model (name){
    const { pascalCaseName } = makeNames(name)
    return `export interface ${pascalCaseName}State { 
  title: string 
}`
  },
  view (name) {
    const { pascalCaseName } = makeNames(name)
    return `import React from 'react'
import { Meta } from 'jshero-core'
import { ${pascalCaseName}State } from './model'
import './styles.css'

export function View (props: ${pascalCaseName}State) {
  return(
    <div className="container">
      <Meta>
        <title>${pascalCaseName}</title>
      </Meta>
      <h1>${pascalCaseName}</h1>
      <p>Hoş Geldiniz!</p>
    </div>
  )
}`
  },
  controller (name) {
    const { pascalCaseName } = makeNames(name)
    return `import { ViewHandler, Get, Controller } from 'jshero-core'
import { ${pascalCaseName}State } from './model'

@Controller()
export class ${pascalCaseName}Controller {
  @ViewHandler()
  @Get()
  async handler (): Promise<${pascalCaseName}State>  {
    return {
      title: '${pascalCaseName}'
    }
  }
}`
  },
  index (name){
    const { lowerCaseName, pascalCaseName } = makeNames(name)
    return `import { Module } from 'jshero-core'
import { View } from './view'
import { ${pascalCaseName}Controller } from './controller'

@Module({
  controller: ${pascalCaseName}Controller,
  name: '${lowerCaseName}' as const,
  view: View,
  exact: true,
  path: '/${lowerCaseName}'
})
export class ${pascalCaseName}Module {}`
  },
  styles (){
    return `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}`
  },
  reducer(name) {
    const { pascalCaseName } = makeNames(name)
    return `import { ${pascalCaseName}State } from './model'

const initialState: ${pascalCaseName}State = {
  title: ''
}
export function reducer (state = initialState, action: any){
  return state
}`
  }
}