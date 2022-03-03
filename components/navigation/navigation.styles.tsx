import styled from 'styled-components'

export const StyledNavigation = styled.nav`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    width: 100vw;
    height: 60px;
`

export const StyledLinkWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
`