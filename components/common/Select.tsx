import React from 'react'
import { SelectProps as MUISelectProps } from '@mui/material'
import MUISelect from '@mui/material/Select'
import styled from '@emotion/styled'

function Select(props: MUISelectProps) {
  return <StyledSelect {...props} sx={{ marginBottom: 2 }}></StyledSelect>
}

export default Select

const StyledSelect = styled(MUISelect)`
  border-radius: 18px;
  margin-bottom: 24px;
  input {
    padding: 8px 16px;
  }
`
