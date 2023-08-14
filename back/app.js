
// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const morgan = require("morgan");
// const jwt = require("jsonwebtoken");
// const SocketIO = require("socket.io");
// const shortid = require("shortid");
// const multer = require("multer");
// const admin = require("firebase-admin");
// const cors = require('cors');
// const axios = require('axios');

// let phoneToken;
// // process.env.GOOGLE_APPLICATION_CREDENTIALS =
// //   "./fooddeliveryapp-6609a-firebase-adminsdk-nev9a-603a8b9ae6.json";
// //
// // admin.initializeApp({
// //   credential: admin.credential.applicationDefault(),
// //   databaseURL: "https://fooddeliveryapp-6609a.firebaseio.com",
// // });
// const orders = [];
// const app = express();
// app.use(cors());
// app.use("/", express.static(path.join(__dirname, "uploads")));
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const jwtSecret = "JWT_SECRET";
// const users = {};

// const verifyToken = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "토큰이 없습니다." });
//   }
//   try {
//     const data = jwt.verify(
//       req.headers.authorization.replace("Bearer ", ""),
//       jwtSecret
//     );
//     res.locals.email = data.email;
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(419)
//         .json({ message: "만료된 액세스 토큰입니다.", code: "expired" });
//     }
//     return res
//       .status(401)
//       .json({ message: "유효하지 않은 액세스 토큰입니다." });
//   }
//   next();
// };

// const verifyRefreshToken = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "토큰이 없습니다." });
//   }
//   try {
//     const data = jwt.verify(
//       req.headers.authorization.replace("Bearer ", ""),
//       jwtSecret
//     );
//     res.locals.email = data.email;
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(419)
//         .json({ message: "만료된 리프레시 토큰입니다.", code: "expired" });
//     }
//     return res
//       .status(401)
//       .json({ message: "유효하지 않은 리프레시 토큰입니다." });
//   }
//   next();
// };


// app.get("/", (req, res) => {
//   res.send("ok");
// });
// app.post("/api/refreshToken", verifyRefreshToken, (req, res, next) => {
//   const accessToken = jwt.sign(
//     { sub: "access", email: res.locals.email },
//     jwtSecret,
//     { expiresIn: "5m" }
//   );
//   if (!users[res.locals.email]) {
//     return res.status(404).json({ message: "가입되지 않은 회원입니다." });
//   }
//   res.json({
//     data: {
//       accessToken,
//       email: res.locals.email,
//       name: users[res.locals.email].name,
//     },
//   });
// });

// // app.post("/users/signup", (req, res, next) => {
// //   if (users[req.body.email]) {
// //     return res.status(401).json({ message: "User or nickname already exists" });
// //   }
// //   users[req.body.email] = {
// //     email: req.body.email.toLowerCase(),
// //     password: req.body.password,
// //     name: req.body.name,
// //   };

// //   return res.json({
// //     data: {
// //       email: req.body.email,
// //       name: req.body.name,
// //     },
// //   });
// // });
// app.post("/users/signup", (req, res, next) => {
//   const { userId, nickName, password } = req.body;

//   // Check if user or nickname already exists
//   if (users[userId] || Object.values(users).some((user) => user.name === nickName)) {
//     return res.status(409).json({ message: "User or Nickname already exists" });
//   }

//   // Create a new user
//   const newUser = {
//     email: userId.toLowerCase(),
//     password: password,
//     name: nickName,
//   };

//   // Add the new user to the users object (simulated database)
//   users[userId] = newUser;

//   return res.json({
//     data: {
//       email: newUser.email,
//       name: newUser.name,
//     },
//   });
// });


// app.post("/users/signin", (req, res, next) => {
//   if (!users[req.body.email]) {
//     return res.status(401).json({ message: "가입하지 않은 회원입니다." });
//   }
//   if (req.body.password !== users[req.body.email].password) {
//     return res.status(401).json({ message: "잘못된 비밀번호입니다." });
//   }
//   const refreshToken = jwt.sign(
//     { sub: "refresh", email: req.body.email },
//     jwtSecret,
//     { expiresIn: "24h" }
//   );
//   const accessToken = jwt.sign(
//     { sub: "access", email: req.body.email },
//     jwtSecret,
//     { expiresIn: "5m" }
//   );
//   users[req.body.email].refreshToken = refreshToken;
//   return res.json({
//     data: {
//       name: users[req.body.email].name,
//       email: req.body.email,
//       refreshToken,
//       accessToken,
//     },
//   });
// });
// app.post("/api/users/logout", verifyToken, (req, res, next) => {
//   delete users[res.locals.email];
//   res.json({ message: "ok" });
// });


// // 
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, "uploads"));
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   }),
// });


// // write
// app.post("/complete", (req, res, next) => {
//   const find = {};
//   const { findName, findSeries, findEpisode, findHour, findMinute, findSecond, findText } = req.body;

//   find[findName] = {
//     findName,
//     findSeries,
//     findEpisode,
//     findHour,
//     findMinute,
//     findSecond,
//     findText,
//   };

//   return res.json({
//     data: {
//       findName,
//       findSeries,
//       findEpisode,
//       findHour,
//       findMinute,
//       findSecond,
//       findText,
//     },
//   });
// });
// //


// // app.post("/accept", verifyToken, (req, res, next) => {
// //   const order = orders.find((v) => v.orderId === req.body.orderId);
// //   if (!order) {
// //     return res.status(400).json({ message: "유효하지 않은 주문입니다." });
// //   }
// //   if (order.rider) {
// //     return res
// //       .status(400)
// //       .json({ message: "다른 사람이 이미 수락한 주문건입니다. " });
// //   }
// //   order.rider = res.locals.email;
// //   console.log(order);
// //   res.send("ok");
// // });

// // try {
// //   fs.readdirSync("uploads");
// // } catch (error) {
// //   console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
// //   fs.mkdirSync("uploads");
// // }

// // app.post("/phonetoken", (req, res, next) => {
// //   phoneToken = req.body.token;
// //   res.send("ok");
// // });
// // app.get("/showmethemoney", verifyToken, (req, res, next) => {
// //   const order = orders.filter(
// //     (v) => v.rider === res.locals.email && !!v.completedAt
// //   );
// //   res.json({
// //     data: order.reduce((a, c) => a + c.price, 0) || 0,
// //   });
// // });

// // app.get("/api/completes", verifyToken, (req, res, next) => {
// //   const order = orders.filter(
// //     (v) => v.rider === res.locals.email && !!v.completedAt
// //   );
// //   res.json({
// //     data: order,
// //   });
// // });

// // app.use((err, req, res, next) => {
// //   console.error(err);
// //   res.status(500).json(err);
// // });

// // // 네이버 검색 API 예제 - 영화,드라마 검색
// // const client_id = 's6CGlfEGZ2SuWRgraLSw';
// // const client_secret = 'jdlGBCi7wZ';
// // // axios
// // app.get('/search/movie', function (req, res) {
// //   const { query } = req.query;
// //   const encodedQuery = encodeURIComponent(query);
// //   var api_url = `https://openapi.naver.com/v1/search/blog?query=${encodedQuery}`;

// //   axios.get(api_url, {
// //     headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
// //   })
// //   .then(response => {
// //     res.json(response.data);
// //   })
// //   .catch(error => {
// //     console.error(error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   });
// // });

// // const server = app.listen(3105, () => {
// //   console.log('Connected.');
// // });








const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
// 몽고
// const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
require('dotenv').config({path:'.env'});
const app = express();


app.use(cors());
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jwtSecret = "JWT_SECRET";
const users = {};

//몽구스//

  const connect = async () => {
    // if (process.env.NODE_ENV !== 'production') {
    //   mongoose.set('debug', true);
    // }
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        // dbName: 'wgwg',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      });
      console.log('몽고디비 연결 성공');
    } catch (error) {
      console.error('몽고디비 연결 에러', error);
    }
  };
  connect();
// const client = new MongoClient('mongodb://localhost:27017', { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// });

// //mongo
// client.connect(async err => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     return;
//   }
//   const db = client.db('wgwg');





const verifyToken = async(req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      jwtSecret
    );
    res.locals.email = data.email;
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(419)
        .json({ message: "만료된 액세스 토큰입니다.", code: "expired" });
    }
    return res
      .status(401)
      .json({ message: "유효하지 않은 액세스 토큰입니다." });
  }
  next();
};

const verifyRefreshToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      jwtSecret
    );
    res.locals.email = data.email;
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(419)
        .json({ message: "만료된 리프레시 토큰입니다.", code: "expired" });
    }
    return res
      .status(401)
      .json({ message: "유효하지 않은 리프레시 토큰입니다." });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("ok");
});
app.post("/api/refreshToken", verifyRefreshToken, (req, res, next) => {
  const accessToken = jwt.sign(
    { sub: "access", email: res.locals.email },
    jwtSecret,
    { expiresIn: "5m" }
  );
  if (!users[res.locals.email]) {
    return res.status(404).json({ message: "가입되지 않은 회원입니다." });
  }
  res.json({
    data: {
      accessToken,
      email: res.locals.email,
      name: users[res.locals.email].name,
    },
  });

  // 아이디 삭제 (회원탈퇴)
app.delete("/users/:userIdx", verifyToken, (req, res, next) => {
  const userIdx = req.params.userIdx;

  if (!users[userIdx]) {
    return res.status(404).json({ message: "User not found" });
  }

  delete users[userIdx];

  return res.sendStatus(204); // 204 means "No Content" (success without any response body)
});
});


// POST /users/signup
app.post("/users/signup", async(req, res, next) => {
  
  const { userId, nickName, password } = req.body;
  try {
    const existingUser = await db.collection('users').findOne({ $or: [{ email: userId }, { name: nickName }] });
    if (existingUser) {
    // Check if user or nickname already exists
    // if (users[userId] || Object.values(users).some((user) => user.name === nickName)) {
      return res.status(409).json({ message: "User or Nickname already exists" });
    }
    
    // Create a new user
    const newUser = {
      email: userId.toLowerCase(),
      password: password,
      name: nickName,
    };
    
    // Add the new user to the users object (simulated database)
    // users[userId] = newUser;
    await db.collection('users').insertOne(newUser);
    
    return res.json({
      data: {
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// });

// POST /users/login
app.post("/users/login", (req, res, next) => {
  const { userId, password } = req.body;

  // Check if user exists and password matches
  if (!users[userId] || users[userId].password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

 // Generate access token and refresh token
 const accessToken = jwt.sign(
  { sub: "access", email: users[userId].email },
  jwtSecret,
  { expiresIn: "5m" }
);
const refreshToken = jwt.sign(
  { sub: "refresh", email: users[userId].email },
  jwtSecret,
  { expiresIn: "7d" }
);
  return res.json({
    statusCode: 200,
    message: "User successfully logged in",
    data: {
      user: {
        userId: users[userId].email,
        nickName: users[userId].name,
        accessToken,
        refreshToken,
      },
    },
  });
});

// POST /users/forgot-password
app.post("/users/forgot-password", (req, res, next) => {
  // Implement the logic to handle forgot password functionality
  // (Sending reset password link to the user's email)
  // For the purpose of this example, we will simply return "No Content" (204) status
  return res.sendStatus(204);
});

// POST /users/reset-password
app.post("/users/reset-password", (req, res, next) => {
  const { token, newPassword } = req.body;

  // Implement the logic to reset the user's password using the provided token
  // For the purpose of this example, we will simply return "No Content" (204) status
  return res.sendStatus(204);
});

// GET userId찾기
app.get('/users/userId/:userId', (req, res, next) => {
  const userId = req.params.userId;

  // Look for a user with the given email in the data storage
  const user = Object.values(users).find((user) => user.email === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // User found, generate an access token and return it in the response
  const accessToken = jwt.sign({ sub: 'access', email: user.email }, jwtSecret, {
    expiresIn: '5m',
  });

  return res.json({
    accessToken: accessToken,
    // userIdx: user.userIdx,
    email: user.email,
    name: user.name,
  });
});






// 구글 로그인
app.post('/auth/google-signin', async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '30827782913-uqnbma9ambqij83talbhoetm2u6t42iu.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const userId = payload.email;
    const nickName = payload.name;

    // 여기에서 userId(email), nickName(name)을 활용하여 사용자 로그인 처리를 하세요.
    // 데이터베이스를 이용하여 사용자 정보를 확인하고 생성합니다.

    // 예시: 데이터베이스에 userId(email)가 있는지 확인
    const existingUser = await YourDatabaseModel.findOne({ email: userId });

    if (existingUser) {
      // 이미 등록된 사용자이므로 로그인 처리
      const accessToken = generateAccessToken(existingUser);
      const refreshToken = generateRefreshToken(existingUser);

      return res.status(200).json({
        userId,
        nickName,
        accessToken,
        refreshToken,
      });
    } else {
      // 새로운 사용자 등록 및 로그인 처리
      const newUser = new YourDatabaseModel({
        email: userId,
        name: nickName,
        // password 등의 필요한 정보 추가
      });

      await newUser.save();

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      return res.status(200).json({
        userId,
        nickName,
        accessToken,
        refreshToken,
      });
    }

  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(500).json({ error: 'Error verifying Google token' });
  }


  
  const server = app.listen(3105, () => {
    console.log("Connected.");
  });

});









