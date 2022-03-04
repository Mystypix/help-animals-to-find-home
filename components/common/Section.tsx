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
    <StyledSection style={{ backgroundColor, width: '100vw' }}>
      <StyledContainer sx={{ mx: 2, py: 4 }}>
        {title && (
          <Text variant="h4" component="h2" style={{ paddingBottom: 64 }}>
            {title}
          </Text>
        )}
        {children}
        {footerLink && (
          <StyledButtonContainer>
            <Button
              url={footerLink.url}
              color="secondary"
              style={{ filter: 'grayscale(80%) brightness(1.15)' }}
            >
              {footerLink.text}
            </Button>
          </StyledButtonContainer>
        )}
      </StyledContainer>
    </StyledSection>
  )
}

export default Section

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledContainer = styled(MUIContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const StyledButtonContainer = styled.div`
  display: flex;
  padding: 32px 0;
`
