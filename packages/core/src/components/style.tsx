import React from 'react'
import { Helmet } from 'react-helmet'
interface Props {
  children:  string
}
export function Style (props: Props) {
  return (
    <Helmet style={[{ cssText: props.children}]} />
  )
}