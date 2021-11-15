import React from 'react'
import { Meta } from 'jshero-core'
import { useAppSelector } from 'lib'
import './styles.css'

export function View () {
  const { title } = useAppSelector(x => x.home)
  return(
    <div className="container">
      <Meta>
        <title>{title}</title>
      </Meta>
      <h1>{title}</h1>
      <p>Welcome!</p>
    </div>
  )
}