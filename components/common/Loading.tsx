import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
	return (
		<Container>
			<CircularProgress size={40} />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px 0;
`