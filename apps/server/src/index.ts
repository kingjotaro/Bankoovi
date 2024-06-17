import 'reflect-metadata';
import dotenv from 'dotenv';
import createApp from './app';

dotenv.config();

const PORT = process.env.PORT || 4000;

createApp().then(app => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}).catch(error => {
  console.error('Error starting server:', error);
});
