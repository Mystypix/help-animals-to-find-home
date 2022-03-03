import React from 'react'
import MUIButton from '@mui/material/Button'
import styled from 'styled-components'

interface IButton {
  backgroundColor?: string
  color?: 'primary' | 'secondary'
  url?: string
  children: React.ReactNode
}

function Button({
  backgroundColor = 'var(--color-primary)',
  color = 'primary',
  url,
  children,
}: IButton) {
  const buttonProps = {
    variant: 'contained',
    disableElevation: true,
    backgroundColor,
    color,
    href: url,
  }
  return <Container {...buttonProps}>{children}</Container>
}

export default Button

const Container = styled<any>(MUIButton)`
  border-radius: 50px;
  height: 48px;
  font-family: var(--font-primary);
  background-color: ${({ color }) =>
    color === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)'};
  padding-left: 32px;
  padding-right: 32px;
  :hover {
    background-color: ${({ color }) =>
      color === 'primary'
        ? 'var(--color-primary-dark)'
        : 'var(--color-secondary-dark)'};
  }
`
