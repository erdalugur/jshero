import React from 'react'
import { Meta } from 'jshero-core'
import { useAppSelector } from 'lib'
import { useStyles } from './style'

export function View () {
  const classes = useStyles()
  const { title } = useAppSelector(x => x.home)
  return(
    <div className={classes.container}>
      <Meta>
        <title>{title}</title>
      </Meta>
      <h1>{title}</h1>
      <p>Hoş Geldiniz!</p>
    </div>
  )
}