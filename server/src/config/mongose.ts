import * as  mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.DATABASE, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection success !');
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error : ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected !');
});

export default mongoose;