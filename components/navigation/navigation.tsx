import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const StyledNavigation = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0 30px;
    width: 100vw;
    height: 60px;
    background: gray;
`

const Navigation = () => (
    <StyledNavigation>
        <Link href='/'>Logo</Link>
        <div style={{flex: '1 1 auto'}} />
        <Link href='/map'>Map</Link>
        <Link href='/shelters'>Shelters</Link>
        <Link href='/pets'>Pets</Link>
        <Link href='/sign-in'>Sign in</Link>
    </StyledNavigation>
)

export default Navigation