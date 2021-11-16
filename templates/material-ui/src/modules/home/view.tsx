import React from 'react'
import { Meta } from 'jshero-core'
import { HomeState } from './model'
import './styles.css'
import { Typography, Button, Snackbar} from '@material-ui/core';

export function View (props: HomeState) {
  const [open, setOpen] = React.useState<boolean>(false)
  return(
    <div className="container">
      <Meta>
        <title>{props.title}</title>
      </Meta>
      <Typography component="h1" variant="h4">{props.title}</Typography>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">Hello World</Button>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={() => setOpen(false)}
        message="Hello World"
      />
    </div>
  )
}