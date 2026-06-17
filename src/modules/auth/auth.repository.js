const bcrypt = require('bcrypt')

exports.signUp = async (pool, data) => {
  const name = data.name
  const username = data.usernmae
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
    'userId': res.insertedId
  }
}
