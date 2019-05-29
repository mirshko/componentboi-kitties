import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import {
  Window,
  Avatar,
  WindowHeader,
  AppBar,
  Toolbar,
  Button,
  Hourglass,
  Cutout
} from "react95";

import Layout from "../components/layout";
import SEO from "../components/seo";

const useKitties = () => {
  const {
    allCryptokitties: { edges }
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
  );

  return edges;
};

const KittyGrid = styled.div`
  --spacing: 1rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: var(--spacing);

  margin-top: calc(48px + var(--spacing));
  margin-right: var(--spacing);
  margin-left: var(--spacing);
  margin-bottom: var(--spacing);

  @media screen and (min-width: 52em) {
    --spacing: 2rem;

    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const KittyImageLoader = props => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      {isLoading && (
        <Loader>
          <Hourglass size={32} />
        </Loader>
      )}
      <Img onLoad={() => setIsLoading(false)} {...props} />
    </>
  );
};

const IndexPage = () => {
  const kitties = useKitties();

  return (
    <Layout>
      <SEO />

      <AppBar style={{ zIndex: 99999 }} fixed={false}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Button
            as="a"
            title="Ask me for a kitty!"
            href={`mailto:jeff@reiner.design?subject=I'd like a CryptoKitty please!`}
            style={{ fontWeight: "bold" }}
          >
            Request A Kitty
          </Button>
          <a href="https://twitter.com/mirshko/" title="Check out my Twitter">
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
                textOverflow: "ellipsis"
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
                title="View details"
                rel="noopener noreferrer"
                href={kitty.node.external_link}
              >
                Details
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
  );
};

export default IndexPage;
