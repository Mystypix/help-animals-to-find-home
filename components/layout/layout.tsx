import Navigation from "../navigation"
import { StyledContent, StyledMain } from "./layout.styles"

type LayoutPropsT = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutPropsT) => (
    <StyledMain>
        <Navigation />
        <StyledContent>{children}</StyledContent>
    </StyledMain>
)

export default Layout