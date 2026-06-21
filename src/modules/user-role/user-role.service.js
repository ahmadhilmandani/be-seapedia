const pool = require("../../config/db");
const repo = require("./user-role.repository");

exports.create = async (payload, userId) => {

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    const result =
      await repo.create(
        conn,
        payload,
        userId
      );

    await conn.commit();

    return result;

  } catch (err) {

    await conn.rollback();

    throw err;

  } finally {

    conn.release();

  }
};

exports.findAll = async () => {

  const conn = await pool.getConnection();

  try {

    return await repo.findAll(conn);

  } finally {

    conn.release();

  }
};

exports.findById = async (id) => {

  const conn = await pool.getConnection();

  try {

    return await repo.findById(
      conn,
      id
    );

  } finally {

    conn.release();

  }
};

exports.update = async (
  id,
  payload,
  userId
) => {

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    const result =
      await repo.update(
        conn,
        id,
        payload,
        userId
      );

    await conn.commit();

    return result;

  } catch (err) {

    await conn.rollback();

    throw err;

  } finally {

    conn.release();

  }
};

exports.remove = async (
  id,
  userId
) => {

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    await repo.remove(
      conn,
      id,
      userId
    );

    await conn.commit();

  } catch (err) {

    await conn.rollback();

    throw err;

  } finally {

    conn.release();

  }
};