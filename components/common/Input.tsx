import React from 'react'
import { InputProps as MUIInputProps } from '@mui/material'
import MUIInput from '@mui/material/Input'

function Input(props: MUIInputProps) {
    return <MUIInput {...props}></MUIInput>
}

export default Input