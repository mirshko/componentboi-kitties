module.exports = {
  siteMetadata: {
    title: `componentboi.eth's kitties`,
    description: ``,
    author: `@mirshko`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: "https://api.opensea.io/api/v1/assets/",

        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `cryptokitties`,

        // Nested level of entities in response object, example: `data.posts`
        entityLevel: `assets`,

        // Request parameters
        // Only available from version 2.1.0
        params: {
          order_by: "current_price",
          order_direction: "asc",
          asset_contract_address: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
          owner: "0xC92DF132c0588C3d337D2E70225a9E85F2338088",
        },

        // Optional payload key name if your api returns your payload in a different key
        // Default will use the full response from the http request of the url
        // payloadKey: `body`,

        // Optionally include some output when building
        // Default is false
        verboseOutput: true, // For debugging purposes
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
