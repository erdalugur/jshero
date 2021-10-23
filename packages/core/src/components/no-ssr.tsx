import React from "react"

interface Props {
  children: JSX.Element | JSX.Element[]
}
export function NoSSR (props: Props) {
  if (process.env.BROWSER) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
      )
  }
  return null
}