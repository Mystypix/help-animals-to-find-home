import React from 'react'
import styled from 'styled-components'
import Link from '../common/Link'
import Text from '../common/Text'
import { Container as MUIContainer, Box as MUIBox } from '@mui/material'

interface ISection {
  title?: string
  footerLink?: { text: string; url: string }
  backgroundColor?: string
  children: React.ReactNode
}

const Section = ({
  title,
  footerLink,
  backgroundColor,
  children,
}: ISection) => {
  return (
    <Container style={{ backgroundColor, width: '100vw' }}>
      <MUIContainer sx={{ mx: 2, py: 4 }}>
        {title && (
          <Text variant="h4" component="h2" style={{ paddingBottom: 16 }}>
            {title}
          </Text>
        )}
        {children}
        {footerLink && (
          <MUIBox
            sx={{
              py: 2,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Link url={footerLink.url}>{footerLink.text}</Link>
          </MUIBox>
        )}
      </MUIContainer>
    </Container>
  )
}

export default Section

const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: center;
`
