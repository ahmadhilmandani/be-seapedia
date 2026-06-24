exports.create = async (
  conn,
  data
) => {

  const sql = `
    INSERT INTO user_role
    (
      user_id,
      role_id,
      user_name,
      role_name,
      created_by,
      is_default,
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
      0
    )
  `;


  const [result] =
    await conn.execute(
      sql,
      [
        data.user_id,
        data.role_id,
        data.user_name,
        data.role_name,
        data.created_by,
        data.is_default
      ]
    );

  return {
    userRoleId: result.insertId
  };
};


exports.createBulk = async (
  conn,
  data
) => {

  const sql = `
    INSERT INTO user_role
    (
      user_id,
      role_id,
      user_name,
      role_name,
      created_by,
      is_default,
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
      0
    )
  `;

  const [result] =
    await conn.execute(
      sql,
      [
        data
      ]
    );

  return {
    id: result.insertId
  };
};

exports.findAll = async (conn) => {

  const sql = `
    SELECT
      id,
      user_id,
      role_id,
      user_name,
      role_name,
      is_default
    FROM
      user_role
    WHERE
      is_delete = 0
    ORDER BY
      id DESC
  `;

  const [rows] =
    await conn.execute(sql);

  return rows;
};


exports.findById = async (
  conn,
  id
) => {

  const sql = `
    SELECT
      *
    FROM
      user_role
    WHERE
      id = ?
    AND
      is_delete = 0
  `;

  const [rows] =
    await conn.execute(
      sql,
      [id]
    );

  if (!rows.length) {
    throw new Error(
      "User Role Not Found"
    );
  }

  return rows[0];
};


exports.update = async (
  conn,
  id,
  data,
  updatedBy
) => {

  const sql = `
    UPDATE
      user_role
    SET
      user_id = ?,
      role_id = ?,
      user_name = ?,
      role_name = ?,
      is_default = ?,
      updated_at = NOW(),
      updated_by = ?
    WHERE
      id = ?
    AND
      is_delete = 0
  `;

  await conn.execute(
    sql,
    [
      data.user_id,
      data.role_id,
      data.user_name,
      data.role_name,
      data.is_default,
      updatedBy,
      id
    ]
  );

  return {
    id
  };
};


exports.remove = async (
  conn,
  id,
  updatedBy
) => {

  const sql = `
    UPDATE
      user_role
    SET
      is_delete = 1,
      updated_at = NOW(),
      updated_by = ?
    WHERE
      id = ?
  `;

  await conn.execute(
    sql,
    [
      updatedBy,
      id
    ]
  );
};