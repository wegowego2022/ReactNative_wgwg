// const mongoose = require("mongoose");
// const MONGODB_URL =
//   'mongodb+srv://wegodjelrkwl:wegodjelrkwl123!@cluster0.ng6r4yb.mongodb.net/?retryWrites=true&w=majority'
//   // 'mongodb+srv://wegodjelrkwl:<password>@cluster0.ng6r4yb.mongodb.net/'

// const connect = async () => {
//   if (process.env.NODE_ENV !== 'production') {
//     mongoose.set('debug', true);
//   }
//   try {
//     await mongoose.connect(MONGODB_URL, {
//       dbName: 'user',
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log('몽고디비 연결 성공');
//   } catch (error) {
//     console.error('몽고디비 연결 에러', error);
//   }
// };

// mongoose.connection.on('error', (error) => {
//   console.error('몽고디비 연결 에러', error);
// });
// mongoose.connection.on('disconnected', () => {
//   console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
//   connect();
// });

// module.exports = connect;
