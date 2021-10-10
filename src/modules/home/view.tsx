import React from 'react'
import { useAppSelector, useDocumentTitle } from '../../lib'
import { useStyles } from './style'

export function View () {
  const classes = useStyles()
  const { meta } = useAppSelector(x => x.home)
  useDocumentTitle(meta.title)
  return(
    <div className={classes.container}>
      <h1>{meta.title}</h1>
      <p>Hoş Geldiniz!</p>
    </div>
  )
}