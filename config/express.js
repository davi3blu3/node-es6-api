import express from 'express';
import routes from '../server/routes';
const app = express();

// mount all routes on /api path
app.use('/api', routes);

export default app;