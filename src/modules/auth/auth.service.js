const pool = require('../../config/db.js')
const jwt = require('jsonwebtoken')
const repo = require('./auth.repository.js')
const repoUserRole = require('../user-role/user-role.repository.js')
const repoAddress = require('../addresses/addresses.repository.js')


exports.signUp = async (payload) => {
  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    const userRes =
      await repo.signUp(
        conn,
        payload
      );


    for (const row of payload.roles) {


      const userRoleRes =
        await repoUserRole.create(
          conn,
          {
            user_id: userRes.userId,
            role_id: row.role,
            user_name: payload.name,
            role_name:
              row.role == 1
                ? 'Buyer'
                : row.role == 2
                  ? 'Seller'
                  : row.role == 3
                    ? 'Driver'
                    : 'Admin',
            is_default: row.is_default,
            created_by: userRes.userId,
          }
        );

      await repoAddress.create(
        conn,
        {
          user_role_id: userRoleRes.userRoleId,
          street_name: row.street_name,
          house_number: row.house_number,
          subdistrict: row.subdistrict,
          regency: row.regency,
          province: row.province,
          postal_code: row.postal_code,
          additional_note: row.additional_note,
          created_by: userRes.userId
        }
      );

    }

    await conn.commit();

    return userRes;

  } catch (err) {

    await conn.rollback();

    throw err;

  } finally {

    conn.release();

  }
};



exports.signIn = async (payload) => {
  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()

    const res = await repo.signIn(conn, payload)

    return res

  } catch (err) {

    throw err

  } finally {
    conn.release();
  }
}