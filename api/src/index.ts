import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes/router';

const app = express();

// Enable all CORS requests
app.use(cors());
app.use('/api/v1', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
