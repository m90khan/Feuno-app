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
  // if (doc.type == "page") {
  //     return "/" + doc.uid;
  // }
  return '/';
};
app.listen(app.get('port'), () => {
  // Onboarding.trigger()
});
const initApi = (req) => {
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
  const endpoint = process.env.PRISMIC_ENDPOINT;
  return Prismic.getApi(endpoint, {
    accessToken,
    req,
  });
};
app.use((request, response, next) => {
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
  const endpoint = process.env.PRISMIC_ENDPOINT;
  response.locals.ctx = {
    prismicH,
  };

  // response.locals.ctx = {
  //   endpoint: endpoint,
  //   linkResolver: handleLinkResolver,
  // };
  // response.locals.PrismicDOM = PrismicDOM;

  // Prismic.api(endpoint, {
  //     accessToken,
  //     request,
  // })
  //     .then((api) => {
  //         request.prismic = { api };

  //         next();
  //     })
  //     .catch((error) => {
  //         next(error.message);
  //     });
  next();
});

app.get('/', async (request, response) => {
  const document = await client.getSingle('home');
  const meta = await client.getSingle('meta');

  const { data: home } = document;

  response.render('pages/home', {
    home,
    meta,
  });
});

app.get('/about', async (request, response) => {
  const document = await client.getSingle('about');
  const meta = await client.getSingle('meta');

  const { data: about } = document;
  console.log(about);
  response.render('pages/about', {
    about,
    meta,
  });
});
app.get('/collections', (request, response) => {
  response.render('pages/collections');
});
app.get('/detail/:uid', (request, response) => {
  response.render('pages/detail');
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
