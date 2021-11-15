import React from 'react'
import { Meta } from '../../../../../packages/core/lib'
import { AboutState } from './model'
import './styles.css'

export function View ({ title }: AboutState) {
  console.log("About", title)
  return(
    <div className="container">
      <Meta>
        <title>{title}</title>
      </Meta>
      <h1>{title}</h1>
      <p>Hoş Geldiniz!</p>
    </div>
  )
}