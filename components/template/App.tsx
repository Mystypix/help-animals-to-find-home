import React from 'react'
import NavBar from '../navigation/NavBar'

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default App
