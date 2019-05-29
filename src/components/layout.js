import React from "react"
import PropTypes from "prop-types"

import "modern-normalize"

const Layout = ({ children }) => (
  <>
    <main style={{ margin: 32 }}>{children}</main>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
