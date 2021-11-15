import React from 'react'
import { Meta } from '../../../../../packages/core/lib'
import { HomeState } from './model'
import './styles.css'

export function View (props: HomeState) {
  console.log("props", props)
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