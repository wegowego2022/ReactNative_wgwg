const express = require('express');
const Comment = require('../schemas/comment');
const router = express.Router();
// router.post("/users/signup", async (req, res, next) => {
//   const { userId, nickName, password } = req.body;
//   // console.log(userId, nickName, password);
//   try {
//     const existingUser = await User.findOne({ userId });
//     if (existingUser) {
//       return res.status(409).json({ message: "이미 가입한 회원 또는 닉네임입니다" });
//     }

//     const newUser = new User({
//       userId,
//       nickName,
//       password,
//     });

//     await newUser.save();
  
//     return res.json({
//       message: "사용자가 성공적으로 등록되었습니다",
//       data: {
//         userId: newUser.userId,
//         nickName: newUser.nickName,
//         password: newUser.password,
//       },
//     });
//   } catch (error) {
//     console.error('회원 가입 중 오류:', error);
//     return res.status(500).json({ message: '내부 서버 오류' });
//   }
// });

const jwt = require('jsonwebtoken');
const User = require('../schemas/user'); // Import the User schema

// POST /users/signup
router.post('/signup', async (req, res) => {
  const { userId, nickName, password } = req.body;

  try {
    // Check if user with the same userId already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user using the User schema
    const newUser = await User.create({
      userId: userId.toLowerCase(),
      nickName,
      password,
    });

    // await newUser.save();

    return res.json({
      message: 'User successfully registered',
      data: {
        userId: newUser.userId,
        nickName: newUser.nickName,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /users/login
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({ userId });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate access token and refresh token
    const accessToken = jwt.sign(
      { sub: 'access', userId: user.userId },
      jwtSecret,
      { expiresIn: '5m' }
    );
    const refreshToken = jwt.sign(
      { sub: 'refresh', userId: user.userId },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'User successfully logged in',
      data: {
        userId: user.userId,
        nickName: user.nickName,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes and functionality can be added here



// POST /users/forgot-password
router.post('/forgot-password', (req, res) => {
  // Implement the logic to handle forgot password functionality
  // (Sending reset password link to the user's email)
  // For the purpose of this example, we will simply return "No Content" (204) status
  return res.sendStatus(204);
});

// POST /users/reset-password
router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  // Implement the logic to reset the user's password using the provided token
  // For the purpose of this example, we will simply return "No Content" (204) status
  return res.sendStatus(204);
});


// router.route('/')
//   .get(async (req, res, next) => {
//     try {
//       const users = await User.find({});
//       res.json(users);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })
//   .post(async (req, res, next) => {
//     try {
//       const user = await User.create({
//         userId: req.body.userId,
//         nickName: req.body.nickName,
//         password: req.body.password,
//       });
//       console.log(user);
//       res.status(201).json(user);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   });

// router.get('/:id/comments', async (req, res, next) => {
//   try {
//     const comments = await Comment.find({ commenter: req.params.id })
//       .populate('commenter');
//     console.log(comments);
//     res.json(comments);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;