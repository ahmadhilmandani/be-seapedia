const pool = require('../../config/db.js')
const jwt = require('jsonwebtoken')
const repo = require('./auth.repository.js')


exports.signUp = async (payload) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const res = repo.signUp(conn, payload)
    await conn.commit()

    return res
  } catch (err) {

    await conn.rollback()
    throw error;

  } finally {

    conn.release();

  }

}
