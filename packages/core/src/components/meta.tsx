import React from 'react'
import { Helmet } from 'react-helmet'
interface Props {
  children: JSX.Element | JSX.Element[]
}
export function Meta (props: Props) {
  return (
    <Helmet> 
      {props.children}
    </Helmet>
  )
}