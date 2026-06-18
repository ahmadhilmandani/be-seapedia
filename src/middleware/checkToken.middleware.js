const jwt = require('jsonwebtoken')

exports.checkToken = (req, res, next) => {
  try {
    const token = req
      .headers['authorization']
      .split('Bearer ')[1]

    if (!token) {
      throw new Error('Token Invalid!')
    }

    const userInfo = jwt.verify(
      token,
      process.env.JWT_KEY
    )

    if (!userInfo) {
      throw new Error('Token Invalid!')
    }

    req.userInfo = userInfo

    next()
  } catch (err) {
    next(err)
  }


}