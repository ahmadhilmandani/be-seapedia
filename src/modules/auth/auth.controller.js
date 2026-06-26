const service = require('./auth.service.js')
const jwt = require('jsonwebtoken')


exports.signUp = async (req, res, next) => {
  try {

    const payload = req.body
    const roles = payload.roles

    if (!payload.name) {
      throw new Error('Name is required')
    }
    else if (!payload.username) {
      throw new Error('Username is required')
    }
    else if (!payload.email) {
      throw new Error('Email is required')
    }
    else if (!payload.password) {
      throw new Error('Password is required')
    }
    else if (roles.length == 0) {
      throw new Error('Select Minimal 1 Role')
    }

    roles.forEach(row => {
      if (!row.street_name.trim()) {
        throw new Error('Street Name is required')
      }
      if (!row.house_number.trim()) {
        throw new Error('House Number is required')
      }
      if (!row.subdistrict.trim()) {
        throw new Error('Subdistrict is required')
      }
      if (!row.regency.trim()) {
        throw new Error('Regency is required')
      }
      if (!row.province.trim()) {
        throw new Error('Province is required')
      }
      if (!row.postal_code.trim()) {
        throw new Error('Postal Code is required')
      }
      if (row.is_default == null || row.is_default == undefined) {
        throw new Error('Provide information either this role is a default role or not!')
      }
    });

    const result = await service.signUp(payload)

    res.status(201).json(result);

  } catch (err) {

    next(err);

  }
}



exports.signIn = async (req, res, next) => {

  try {

    const payload = req.body

    if (!payload.identifier || !payload.password) {
      throw new Error('Username, email, and password is required')
    }

    const result = await service.signIn(payload)

    res.status(200).json({
      'success': true,
      'msg': 'ok!',
      'user': {
        'token': `${result}`
      }
    });

  } catch (err) {

    next(err)

  }
}



exports.setActiveRole = async (req, res, next) => {
  try {

    const payload = req.body
    const userRoles = req.userInfo.roles
    let isHasRole = false;

    if (!payload.role) {
      throw new Error('Role is required!')
    }

    userRoles.forEach((row) => {
      if (row.role_id == payload.role) {
        req.userInfo.activeRole = payload.role
        isHasRole = true
      }
    })

    if (!isHasRole) {
      throw new Error(`User doesn't have that role!`)
    }

    delete req.userInfo['iat']
    
    delete req.userInfo['exp']

    const tokenJwt = jwt.sign(
      req.userInfo,
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    )

    res.status(200).json({
      'success': true,
      'msg': 'ok!',
      'user': {
        'data': req.userInfo,
        'token': tokenJwt
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
