const { makeNames } = require("../utils")
module.exports = {
  model (name){
    const { pascalCaseName } = makeNames(name)
    return `export interface ${pascalCaseName}State { }`
  },
  view (name) {
    const { pascalCaseName, lowerCaseName } = makeNames(name)
    return `import React from 'react'
    import { Meta } from 'jshero-core'
    import { useAppSelector } from 'lib'
    import { useStyles } from './style'
    
    export function View () {
      const classes = useStyles()
      const ${lowerCaseName} = useAppSelector(x => x.lowerCaseName)
      return(
        <div className={classes.container}>
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
    return `import { ViewHandler, Get, Controller } from "jshero-core"
import { ${pascalCaseName}State } from "./model";

@Controller()
export class ${pascalCaseName}Controller {
  @ViewHandler()
  @Get()
  handler (): Promise<${pascalCaseName}State>  {
    return {
    }
  }
}`
  },
  index (name){
    const { lowerCaseName, pascalCaseName } = makeNames(name)
    return `import { Module } from 'jshero-core'
import { View } from './view'
import { ${pascalCaseName}Controller } from './controller'
import { reducer } from './reducer'

@Module({
  controller: ${pascalCaseName}Controller,
  name: '${lowerCaseName}' as const,
  reducer: reducer,
  view: View,
  exact: true,
  path: '/${lowerCaseName}'
})
export class ${pascalCaseName}Module {}`
  },
  style (){
    return `import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100vh'
  }
})`
  },
  reducer(name) {
    const { pascalCaseName } = makeNames(name)
    return `import { ${pascalCaseName}State } from './model'

const initialState: ${pascalCaseName}State = {
}
export function reducer (state = initialState, action: any){
  return state
}`
  }
}