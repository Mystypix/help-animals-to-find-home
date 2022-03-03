import Link from '../link'
import {StyledNavigation} from './navigation.styles'

const Navigation = () => (
    <StyledNavigation>
        <Link href='/'>Logo</Link>
        <div style={{flex: '1 1 auto'}} />
        <Link href='/map'>Map</Link>
        <Link href='/shelters'>Shelters</Link>
        <Link href='/pets'>Pets</Link>
        <Link href='/login-and-register'>Login/Register</Link>
    </StyledNavigation>
)

export default Navigation