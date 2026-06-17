const service = require('./auth.service.js')

exports.signUp = (req, res, next) => {
  try {
  
    const payload = req.body

    const result = service.signUp(payload)

    res.status(201).json(result);
  
  } catch (err) {

    next(err);
  
  }
}

