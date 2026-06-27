exports.findAll = async (conn) => {

  const [rows] = await conn.query(`
        SELECT *
        FROM stores
        WHERE is_delete=0
        ORDER BY id DESC
    `);

  return rows;

};

exports.findById = async (conn, id) => {

  const [rows] = await conn.query(`
        SELECT *
        FROM stores
        WHERE id=?
        AND is_delete=0
    `, [id]);

  return rows[0];

};

exports.findByName = async (conn, name) => {

  const [rows] = await conn.query(`
        SELECT *
        FROM stores
        WHERE name=?
        AND is_delete=0
    `, [name]);

  return rows[0];

};

exports.create = async (
  conn,
  store_name,
  user_role_id,
  created_by
) => {

  const [result] = await conn.query(`
        INSERT INTO stores
        (
            name,
            user_role_id,
            created_at,
            created_by,
            is_delete
        )
        VALUES
        (?,?,NOW(),?,0)
    `,
    [
      store_name,
      user_role_id,
      created_by
    ]);

  return result.insertId;

};

exports.update = async (conn, id, data) => {

  await conn.query(`
        UPDATE stores
        SET
            name=?,
            updated_at=NOW(),
            updated_by=?
        WHERE id=?
    `,
    [
      data.name,
      data.updated_by,
      id
    ]);

};

exports.destroy = async (conn, id, userId) => {

  await conn.query(`
        UPDATE stores
        SET
            is_delete=1,
            updated_at=NOW(),
            updated_by=?
        WHERE id=?
    `,
    [
      userId,
      id
    ]);

};