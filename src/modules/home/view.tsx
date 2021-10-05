import React from 'react'
import { useStyles } from './style'

export function View () {
  const classes = useStyles()
  return(
    <div>
      Home Page
      <button className={classes.button}>button</button>
    </div>
  )
}