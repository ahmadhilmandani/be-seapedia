exports.create = async (
  conn,
  data
) => {

  const sql = `
    INSERT INTO addresses
    (
      user_role_id,
      street_name,
      house_number,
      subdistrict,
      regency,
      province,
      postal_code,
      additional_note,
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
      ?,
      ?,
      NOW(),
      ?,
      0
    )
  `;

  const [result] =
    await conn.execute(
      sql,
      [
        data.user_role_id,
        data.street_name,
        data.house_number,
        data.subdistrict,
        data.regency,
        data.province,
        data.postal_code,
        data.additional_note,
        data.created_by
      ]
    );

  return {
    id: result.insertId
  };
};


exports.findAll = async (conn) => {

  const sql = `
    SELECT
      a.id,
      a.user_role_id,
      a.street_name,
      a.house_number,
      a.subdistrict,
      a.regency,
      a.province,
      a.postal_code,
      a.additional_note,
      ur.user_name,
      ur.role_name,
      ur.is_default
    FROM
      addresses a
    LEFT JOIN
      user_role ur
        ON ur.id = a.user_role_id
    WHERE
      a.is_delete = 0
    ORDER BY
      a.id DESC
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
      addresses
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
      "Address Not Found"
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
      addresses
    SET
      user_role_id = ?,
      street_name = ?,
      house_number = ?,
      subdistrict = ?,
      regency = ?,
      province = ?,
      postal_code = ?,
      additional_note = ?,
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
      data.user_role_id,
      data.street_name,
      data.house_number,
      data.subdistrict,
      data.regency,
      data.province,
      data.postal_code,
      data.additional_note,
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
      addresses
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