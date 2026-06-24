const jwt = require('jsonwebtoken')

exports.checkActiveRole = (req, res, next) => {
  try {
    const activeRole = req.userInfo.activeRole

    if (!activeRole) {
      throw new Error('No Role is Active!')
    }

    next()
    
  } catch (err) {

    next(err)
  }


}