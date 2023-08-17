const mongoose = require('mongoose');

const connect = async () => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('몽고디비 연결 성공');
    } catch (error) {
      console.error('몽고디비 연결 에러', error);
    }
  };

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;