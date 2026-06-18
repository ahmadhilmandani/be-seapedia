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

