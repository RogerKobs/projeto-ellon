import { Box, Grid } from '@material-ui/core'
import React from 'react'
import ListUser from './listUser'
import Register from './register'

export default function Page() {
  return (
    <div>
      <Box p={2}>
        <Grid
          container
          spacing={2}
          direction='row'
        >

          <Grid item xs={6}>
            <Register />
          </Grid>

          <Grid item xs={6}>
            <ListUser />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
