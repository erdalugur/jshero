import React from 'react'
import { Helmet } from 'react-helmet'
import { useAppSelector } from '../../lib'
import { useStyles } from './style'

export function View () {
  const classes = useStyles()
  const { meta } = useAppSelector(x => x.home)
  return(
    <div className={classes.container}>
      <Helmet>
        <title>{meta.title}</title>
      </Helmet>
      <h1>{meta.title}</h1>
      <p>Hoş Geldiniz!</p>
    </div>
  )
}