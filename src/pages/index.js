import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import {
  Window,
  Avatar,
  WindowHeader,
  AppBar,
  Toolbar,
  Button,
  Hourglass,
  Cutout,
} from "react95"

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
                  fluid(maxWidth: 500, quality: 100) {
                    ...GatsbyImageSharpFluid_noBase64
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

const KittyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;

  margin-top: calc(48px + 1rem);
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;

  @media screen and (min-width: 52em) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2rem;
    margin-top: calc(48px + 2rem);
    margin-right: 2rem;
    margin-left: 2rem;
    margin-bottom: 2rem;
  }
`

const KittyImageLoader = props => {
  const [loading, setLoading] = React.useState(true)

  return (
    <>
      {loading && (
        <Hourglass
          size={32}
          style={{
            left: "50%",
            top: "50%",
            position: "absolute",
            transform: "translateX(-50%)",
          }}
        />
      )}
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
        onLoad={() => setLoading(false)}
        {...props}
      />
    </>
  )
}

const IndexPage = () => {
  const kitties = useKitties()

  return (
    <Layout>
      <SEO />

      <AppBar style={{ zIndex: 99999 }} fixed={false}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Button
            as="a"
            href={`mailto:jeff@reiner.design?subject=I'd like a CryptoKitty please!`}
            style={{ fontWeight: "bold" }}
          >
            Trade
          </Button>
          <a href="https://twitter.com/mirshko/">
            <Avatar style={{ background: "palevioletred" }}>CB</Avatar>
          </a>
        </Toolbar>
      </AppBar>

      <KittyGrid>
        {kitties.map((kitty, index) => (
          <Window key={index}>
            <WindowHeader
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {kitty.node.name}
            </WindowHeader>
            <Toolbar>
              <Button
                as="a"
                variant="menu"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                href={kitty.node.external_link}
              >
                View
              </Button>
            </Toolbar>
            <Cutout
              style={{ backgroundColor: `#${kitty.node.background_color}` }}
            >
              <KittyImageLoader
                title={kitty.node.name}
                alt={kitty.node.name}
                fluid={kitty.node.localImage.childImageSharp.fluid}
              />
            </Cutout>
          </Window>
        ))}
      </KittyGrid>
    </Layout>
  )
}

export default IndexPage
