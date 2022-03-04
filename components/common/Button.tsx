import React from 'react'
import MUIButton from '@mui/material/Button'
import styled from 'styled-components'

interface IButton {
  backgroundcolor?: string
  color?: 'primary' | 'secondary'
  url?: string
  children: React.ReactNode
  type?: string
  disabled?: boolean
  onClick?: any
  style?: any
  variant?: string
}

function Button({
  backgroundcolor = 'var(--color-primary)',
  color = 'primary',
  url,
  children,
  type,
  disabled,
  onClick,
  style,
  variant,
}: IButton) {
  const buttonProps = {
    variant: 'contained',
    disableElevation: true,
    backgroundcolor,
    color,
    href: url,
    type,
    disabled,
    onClick,
    style,
  }
  return <Container {...buttonProps}>{children}</Container>
}

export default Button

const Container = styled<any>(MUIButton)`
  border-radius: 50px;
  height: 48px;
  font-family: var(--font-primary);
  color: ${({ color }) =>
    color === 'primary' ? 'white' : 'var(--color-text)'};
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
