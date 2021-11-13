import React from 'react'
import { Meta } from 'jshero-core'
import { HomeState } from './model'
import './styles.css'

export function View (props: HomeState) {
  return(
    <div className="container">
      <Meta>
        <title>{props.title}</title>
      </Meta>
      <h1>{props.title}</h1>
      <p>Hoş Geldiniz!</p>
    </div>
  )
}