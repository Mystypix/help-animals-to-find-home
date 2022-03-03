import React from 'react'
import styled from 'styled-components'
import Image from '../common/Image'
import Text from '../common/Text'
import Button from '../common/Button'
import Section from '../common/Section'

const HomeIntroSection = () => (
  <Section>
    <Container>
      <div style={{ maxWidth: 420 }}>
        <Text variant="h3" component="h1">
          Dream about best friend?
        </Text>
        <p>Our best beauties waiting for a home</p>
        <Button>Find a Friend</Button>
      </div>
      <Image
        src="/images/intro.png"
        width="572"
        height="560"
        alt="Cute animal looking at you"
      />
    </Container>
  </Section>
)

export default HomeIntroSection

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100vw;
  height: 80vh;

  p {
    padding-bottom: 32px;
    color: var(--color-text-secondary);
  }
`
