import React from "react"
import Navigation from "../navigation"

type LayoutPropsT = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutPropsT) => (
    <div>
        <Navigation />
        <div>{children}</div>
    </div>
)

export default Layout