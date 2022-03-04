import styled from 'styled-components'

export const StyledNavigation = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 50px;
  padding: 0 10vw;
  width: 100vw;
  height: 48px;
`

export const StyledLinkWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
`
