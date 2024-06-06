import React from 'react'
import Navbar from '../navbar/Navbar'
import styled from "./layout.module.css"

const Layout = ({children}) => {
  return (
    <div className={styled.layout}>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
