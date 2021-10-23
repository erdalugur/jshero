import React from 'react'
import { Meta } from 'jshero-core'
import { useAppSelector } from 'lib'
import { useStyles } from './style'

export function View () {
  const classes = useStyles()
  const { meta } = useAppSelector(x => x.home)
  return(
    <div className={classes.container}>
      <Meta>
        <title>{meta.title}</title>
      </Meta>
      <h1>{meta.title}</h1>
      <p>Hoş Geldiniz!</p>
    </div>
  )
}