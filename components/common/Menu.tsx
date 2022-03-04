import * as React from 'react'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import Stack from '@mui/material/Stack'
import styled from '@emotion/styled'

interface IMenu {
  children: React.ReactNode
}

const Menu = ({ children }: IMenu) => {
  return (
    <Stack direction="row" spacing={2}>
      <StyledPaper>
        <StyledMenuList>{children}</StyledMenuList>
      </StyledPaper>
    </Stack>
  )
}

export default Menu

const StyledPaper = styled(Paper)`
  border-radius: 18px;
  width: 280px;
  height: 200px;
`

const StyledMenuList = styled(MenuList)`
  padding-top: 24px;
  padding-bottom: 24px;
`
