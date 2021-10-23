const { makeNames } = require("../utils")
module.exports = {
  model (name){
    const { pascalCaseName } = makeNames(name)
    return `export interface ${pascalCaseName}State { }`
  },
  view (name) {
    const { pascalCaseName } = makeNames(name)
    return `import React from 'react'
import { useStyles } from './style'

export function View () {
  const classes = useStyles()
  return(
    <div className={classes.container}>
      <h1>${pascalCaseName} Page!</h1>
    </div>
  )
}`
  },
  controller (name) {
    const { pascalCaseName } = makeNames(name)
    return `import { ViewHandler, Get, Controller } from "jshero-core"
import { PageState } from "../../types"
import { ${pascalCaseName}State } from "./model";

@Controller()
export class ${pascalCaseName}Controller {
  @ViewHandler()
  @Get()
  handler (): PageState<${pascalCaseName}State>  {
    return {
      meta: {
        title: ''
      },
      props: {}
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
    return `import { PageState } from "../../types"
    import { ${pascalCaseName}State } from './model'

const initialState: PageState<${pascalCaseName}State> = {
  meta: {
    title: ''
  },
  props: {}
}
export function reducer (state = initialState, action: any){
  return state
}`
  }
}