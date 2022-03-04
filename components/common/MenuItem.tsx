import * as React from 'react'
import styled from '@emotion/styled'
import { MenuItem as MUIMenuItem, MenuItemProps } from '@mui/material'

const MenuItem = (props: MenuItemProps) => <StyledMenuItem {...props} />

export default MenuItem

const StyledMenuItem = styled(MUIMenuItem)`
  padding: 12px 0 12px 32px;
  font-family: var(--font-primary);
`
