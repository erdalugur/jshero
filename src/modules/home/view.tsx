import React from 'react'
import { useStyles } from './style'

export function View () {
  const classes = useStyles()
  return(
    <div className={classes.container}>
      <h1>JSHERO</h1>
      <p>Hoş Geldiniz! asda</p>
    </div>
  )
}