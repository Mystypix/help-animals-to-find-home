import * as React from 'react'
import { CircularProgress } from '@mui/material'
import styled from '@emotion/styled'

const LoadingPage = () => (
  <Container>
    <CircularProgress size={80} />
  </Container>
)

export default LoadingPage

const Container = styled.div`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
`
