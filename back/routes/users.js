const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();


router.post("/signup", async (req, res, next) => {
  const { userId, nickName, password } = req.body;

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ message: "이미 가입한 회원 또는 닉네임입니다" });
    }

    const newUser = new User({
      userId,
      nickName,
      password,
    });

    await newUser.save();
  
    return res.json({
      message: "사용자가 성공적으로 등록되었습니다",
      data: {
        userId: newUser.userId,
        nickName: newUser.nickName,
      },
    });
  } catch (error) {
    console.error('회원 가입 중 오류:', error);
    return res.status(500).json({ message: '내부 서버 오류' });
  }
});


router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        userId: req.body.userId,
        nickName: req.body.nickName,
        password: req.body.password,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id })
      .populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;