require('dotenv').config();

// const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const UAParser = require('ua-parser-js');
const prismicH = require('@prismicio/helpers');

const find = require('lodash/find');

const Onboarding = require('./onboarding');

const app = require('./config');
const { client } = require('./prismic');
const pageSize = 50;

// const get = (results, request) => {
//   const ua = UAParser(request.headers['user-agent']);

//   const meta = find(results, { type: 'metadata' });

//   const isAJAX = request.headers['x-requested-with'] === 'XMLHttpRequest';
//   const isDesktop = ua.device.type === undefined;
//   const isPhone = ua.device.type === 'mobile';
//   const isTablet = ua.device.type === 'tablet';

//   return {
//     isAJAX,
//     isDesktop,
//     isPhone,
//     isTablet,
//     meta,
//   };
// };
const handleLinkResolver = (doc, ctx) => {
  if (doc.type == 'product') {
    return `/detail/${doc.slug}`;
  }
  if (doc.type == 'about') {
    return `/about`;
  }
  if (doc.type == 'collections') {
    return `/collections`;
  }
  return '/';
};
app.listen(app.get('port'), () => {
  // Onboarding.trigger()
});

app.use((request, response, next) => {
  const endpoint = process.env.PRISMIC_ENDPOINT;
  response.locals.ctx = { endpoint, prismicH, handleLinkResolver };

  next();
});

const commonRequests = async () => {
  const meta = await client.getSingle('meta');
  const preloader = await client.getSingle('preloader');
  const navigation = await client.getSingle('navigation');
  return {
    meta,
    preloader,
    navigation,
  };
};
app.get('/', async (request, response) => {
  const home = await client.getSingle('home');
  const commonData = await commonRequests();
  const collections = await client.getAllByType('collection', {
    fetchLinks: 'product.image',
  });
  response.render('pages/home', {
    home,
    collections,
    ...commonData,
  });
});

app.get('/about', async (request, response) => {
  const document = await client.getSingle('about');
  const commonData = await commonRequests();

  const { data: about } = document;
  console.log(about);
  response.render('pages/about', {
    about,
    ...commonData,
  });
});
app.get('/collections', async (request, response) => {
  const home = await client.getSingle('home');

  const collections = await client.getAllByType('collection', {
    fetchLinks: 'product.image',
  });
  const commonData = await commonRequests();

  response.render('pages/collections', {
    collections,
    home,
    ...commonData,
  });
});
app.get('/detail/:uid', async (request, response) => {
  const product = await client.getByUID('product', request.params.uid, {
    fetchLinks: 'collection.title',
  });
  const commonData = await commonRequests();

  response.render('pages/detail', {
    product,
    ...commonData,
  });
});
app.use((request, response) => {
  response.status(404);

  if (request.accepts('html')) {
    return response.redirect('/');
  }

  if (request.accepts('json')) {
    return response.send({ error: 'Not Found' });
  }

  response.type('txt').send('Not Found');
});
