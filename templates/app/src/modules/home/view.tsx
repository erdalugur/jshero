import React from 'react'
import { Meta } from 'jshero-core'
import { HomeState } from './model'
import './styles.css'

export function View ({ title }: HomeState) {
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