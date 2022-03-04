import React from 'react'
import styled from 'styled-components'
import Image from '../common/Image'
import Text from '../common/Text'
import Button from '../common/Button'
import Section from '../common/Section'
import SectionTitle from '../section-title'
import { useRouter } from 'next/router'

const HomeIntroSection = () => {
  const router = useRouter()

  return (
    <Section>
      <Container>
        <div style={{ maxWidth: 420 }}>
          <Text variant="h3" component="h1">
            Dream about best friend?
          </Text>
          <p>Our best beauties waiting for a home</p>
          <Button onClick={() => router.push(`/pets`)}>Find a Friend</Button>
        </div>
        <Image
          src="/images/intro.png"
          width="572"
          height="560"
          alt="Cute animal looking at you"
          objectFit='cover'
        />
      </Container>
      <Steps>
        <StepColumn>
          <Image src='images/step-01.svg' width='84px' height='84px' alt='step-01' />
          <SectionTitle>Search</SectionTitle>
          <div>It is easy to find a dog or cat who is right for you at a shelter or rescue group. Simply enter your zip code above to start your search.</div>
        </StepColumn>
        <Paws><Image src='images/paws-top.svg' width='155px' height='41px' alt='paws-01' /></Paws>
        <StepColumn>
          <Image src='images/step-02.svg' width='84px' height='84px' alt='step-02' />
          <SectionTitle>Meet</SectionTitle>
          <div>Once you find a pet, click learn more about me to get contact info for their shelter or rescue. Contact them to learn more about how to meet and adopt the pet.</div>
        </StepColumn>
        <Paws><Image src='images/paws-bottom.svg' width='155px' height='41px' alt='paws-02' /></Paws>
        <StepColumn>
          <Image src='images/step-03.svg' width='84px' height='84px' alt='step-03' />
          <SectionTitle>Adopt</SectionTitle>
          <div>The rescue or shelter will walk you through their adoption process. Prepare your home for the arrival of your dog or cat to help them adjust to their new family.</div>
        </StepColumn>
      </Steps>
    </Section>
  )
}

export default HomeIntroSection

const Paws = styled.div`
  flex: 0 0 155px;
  margin: 25px -30px 0;
`

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 128px;
`

const StepColumn = styled.div`
  flex: 0 0 306px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 128px;
  max-width: 1200px;
  width: 100vw;

  p {
    padding-bottom: 32px;
    color: var(--color-text-secondary);
  }
`
