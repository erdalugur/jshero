import React from 'react'
import { Helmet } from 'react-helmet'
interface Props {
  children: JSX.Element | JSX.Element[]
}
export function Script (props: Props) {
  return (
    <Helmet>
      {props.children}
    </Helmet>
  )
}