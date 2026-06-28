const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUp = async (pool, data) => {
  const name = data.name
  const username = data.username
  const email = data.email
  const password = await bcrypt.hash(
    data.password,
    10
  )
  const createdAt = new Date()
  const createdBy = null
  const isDelete = 0

  const rawSql = `
    INSERT INTO
      users
      (
        name,
        username,
        email,
        password,
        created_at,
        created_by,
        is_delete
      )
    VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
  `

  const [res] = await pool.execute(
    rawSql,
    [
      name,
      username,
      email,
      password,
      createdAt,
      createdBy,
      isDelete
    ]
  )


  return {
    'userId': res.insertId
  }
}



exports.signIn = async (pool, data) => {
  try {
    const rawSql = `
      SELECT
        u.id AS user_id,
        u.name,
        u.username,
        u.email,
        u.password,
        ur.id AS user_role_id,
        ur.role_id,
        ur.role_name,
        ur.is_default
      FROM
        users AS u
      LEFT JOIN
        user_role AS ur
        ON u.id = ur.user_id
      WHERE
        u.username = ?
      OR
        u.email = ?
      AND
        u.is_delete = 0
      AND
        ur.is_delete = 0
    `

    const [rows] = await pool.execute(
      rawSql,
      [
        data.identifier,
        data.identifier,
      ]
    )

    if (!rows.length) {
      throw new Error("Username, email, or password is invalid!");
    }

    const isMatch = await bcrypt.compare(data.password, rows[0].password);

    if (!isMatch) {
      throw new Error("Username, email, or password is invalid!");
    }

    const encodedObjJwt = {
      'user_id': rows[0].user_id,
      'name': rows[0].name,
      'username': rows[0].username,
      'email': rows[0].email,
      'roles': []
    }


    for (const [index, val] of rows.entries()) {

      encodedObjJwt.roles.push({
        'user_role_id': val.user_role_id,
        'role_id': val.role_id,
        'role_name': val.role_name,
        'is_default': val.is_default
      });

      if (val.role_id == 2) {
        const rawSql = `
          SELECT
            id AS store_id,
            name AS store_name
          FROM
            stores
          WHERE
            user_role_id = ?
          AND
            is_delete = 0
        `;

        const [rowStore] = await pool.execute(rawSql, [val.user_role_id]);

        if (rowStore && rowStore.length > 0) {
          encodedObjJwt.roles[
            encodedObjJwt.roles.length - 1
          ]['store'] = {
            'id': rowStore[0].store_id,
            'name': rowStore[0].store_name,
          };
        }
      }
    }

    const activeRole = rows.find((row) => {
      return row.is_default == 1
    })

    encodedObjJwt['activeRole'] = activeRole.role_id

    const tokenJwt = jwt.sign(
      encodedObjJwt,
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    )

    return tokenJwt

  } catch (err) {

    throw err

  }
}