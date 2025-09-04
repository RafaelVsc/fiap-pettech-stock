import redoc from 'redoc-express';

export function setupRedoc(app) {
  const redocOptions = {
    title: 'pettech-stock API',
    version: '1.0',
    specUrl: '/api-json',
  };

  app.use('/doc', redoc(redocOptions));
}
