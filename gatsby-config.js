module.exports = {
  siteMetadata: {
    title: `componentboi.eth's kitties`,
    description: ``,
    author: `@mirshko`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: "https://api.opensea.io/api/v1/assets/",
        name: `cryptokitties`,
        entityLevel: `assets`,
        params: {
          order_by: "current_price",
          order_direction: "asc",
          asset_contract_address: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
          owner: "0xC92DF132c0588C3d337D2E70225a9E85F2338088",
        },
      },
    },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "cryptokitties",
        imagePath: "image_original_url",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kitties`,
        short_name: `kitties`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
      },
    },
  ],
}
