import styled from 'styled-components'
import React from 'react'

const StyledInputLabel = styled.label`
    display: block;
    margin-bottom: 6px;
    font-size: 11px;
    line-height: 16px;
`

export const InputLabel = (props: any) => {
    return <StyledInputLabel {...props}>{props.children}</StyledInputLabel>
}
