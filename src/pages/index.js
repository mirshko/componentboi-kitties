import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const useKitties = () => {
  const {
    allCryptokitties: { edges },
  } = useStaticQuery(
    graphql`
      {
        allCryptokitties(filter: { id: { ne: "dummy" } }) {
          edges {
            node {
              name
              localImage {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
              background_color
              external_link
            }
          }
        }
      }
    `
  )

  return edges
}

const KittyName = props => (
  <p
    style={{
      textDecoration: "none",
      fontSize: 18,
      margin: 0,
      paddingTop: 16,
      color: "#82817d",
      lineHeight: 1,
    }}
    {...props}
  />
)

const KittyImage = props => (
  <Img
    placeholderStyle={{
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      borderRadius: 18,
    }}
    imgStyle={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      left: "50%",
      top: "50%",
    }}
    {...props}
  />
)

const KittyCard = ({ bg, ...rest }) => (
  <div
    style={{
      backgroundColor: bg,
      position: "relative",
      borderRadius: 18,
    }}
    {...rest}
  />
)

const IndexPage = () => {
  const kitties = useKitties()

  return (
    <Layout>
      <SEO />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridGap: 32,
        }}
      >
        {kitties.map((kitty, index) => (
          <div key={index}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={kitty.node.external_link}
            >
              <KittyCard bg={`#${kitty.node.background_color}`}>
                <KittyImage
                  fluid={kitty.node.localImage.childImageSharp.fluid}
                />
              </KittyCard>
            </a>
            <KittyName>{kitty.node.name}</KittyName>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
