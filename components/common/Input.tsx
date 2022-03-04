import React from 'react'
import { InputProps as MUIInputProps } from '@mui/material'
import MUIInput from '@mui/material/OutlinedInput'
import styled from '@emotion/styled'

function Input(props: MUIInputProps) {
  return <StyledInput {...props} sx={{ marginBottom: 2 }}></StyledInput>
}

export default Input

const StyledInput = styled(MUIInput)`
  display: flex !important;
  border-radius: 18px;
  margin-bottom: 24px;
  input {
    padding: 8px 16px;
  }
`
