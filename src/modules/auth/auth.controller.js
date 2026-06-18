const service = require('./auth.service.js')

exports.signUp = (req, res, next) => {
  try {

    const payload = req.body

    if (!payload.name) {
      throw new Error('Name is required')
    }
    else if (!payload.usernmae) {
      throw new Error('Username is required')
    }
    else if (!payload.email) {
      throw new Error('Email is required')
    }
    else if (!payload.password) {
      throw new Error('Password is required')
    }

    const result = service.signUp(payload)

    res.status(201).json(result);

  } catch (err) {

    next(err);

  }
}



exports.signIn = async (req, res, next) => {
  try {

    const payload = req.body

    if (!payload.identifier) {
      throw new Error('Username, email, and password is required')
    }

    const result = await service.signIn(payload)

    res.status(200).json({
      'success': true,
      'msg': 'ok!',
      'user': {
        'token': result
      }
    });

  } catch (err) {

    next(err)

  }
}

exports.getUserInfo = async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(req.userInfo)

  } catch (err) {

    next(err)

  }
} 
