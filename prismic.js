const fetch = require('cross-fetch');
const prismic = require('@prismicio/client');

const repoName = 'feuno'; // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN; // If your repo is private, add an access token.
const endpoint = prismic.getEndpoint(repoName); // Format your endpoint.

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: 'page',
    path: '/about',
  },
];
exports.client = prismic.createClient(endpoint, {
  fetch,
  accessToken,
  //   routes,
});
