import React from 'react'
import { Container as MUIContainer } from '@mui/material'

const Container = ({ children }: any) => (
  <MUIContainer sx={{ py: 7 }}>{children}</MUIContainer>
)

export default Container
