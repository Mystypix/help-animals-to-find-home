import React from 'react'
import { ButtonProps as MUIButtonProps } from '@mui/material'
import MUIButton from '@mui/material/Button'

function Button(props: MUIButtonProps) {
    return <MUIButton {...props}></MUIButton>
}

export default Button