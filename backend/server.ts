import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/db';
import { IUser } from './models/userModel';
import { Document, Types } from 'mongoose';

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('Please set to production');
  });
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

//Extending the Request interface to receive the user object
declare module 'express-serve-static-core' {
  interface Request {
    user:
      | (Document<unknown, any, IUser> &
          IUser & {
            _id: Types.ObjectId;
          })
      | null;
  }
}
