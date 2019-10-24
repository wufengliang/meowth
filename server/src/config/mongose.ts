import * as  mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.DATABASE, { useNewUrlParser: true, useCreateIndex: true });
// const options = {
//     auth: {
//         user: config.USER,
//         password: config.PASSWORD
//     },
//     useNewUrlParser: true,
//     useCreateIndex: true,
// }

// mongoose.connect(config.DATABASE, options)

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