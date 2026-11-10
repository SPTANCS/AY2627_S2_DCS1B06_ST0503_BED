export default {
  schema: './src/db/schema.js',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:local.db',
  },
};