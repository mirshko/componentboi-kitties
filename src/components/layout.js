import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";
import PropTypes from "prop-types";

const ResetStyles = createGlobalStyle`
  ${reset}

  body {
    background-color: teal;
  }
`;

const Layout = ({ children }) => (
  <>
    <ResetStyles />
    <ThemeProvider theme={themes.default}>
      <main>{children}</main>
    </ThemeProvider>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
