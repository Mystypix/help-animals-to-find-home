import React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Button from './Button'
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
        <SectionHeader>
          {title && (
            <Text variant="h4" component="h2" style={{ paddingBottom: 16 }}>
              {title}
            </Text>
          )}
          {footerLink && (
            <Button url={footerLink.url}>{footerLink.text}</Button>
          )}
        </SectionHeader>
        {children}
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

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
