const pool = require("../../config/db");
const repo = require("./store.repository");

exports.index = async () => {

  const conn = await pool.getConnection();

  try {

    return await repo.findAll(conn);

  } finally {

    conn.release();

  }

};

exports.show = async (id) => {

  const conn = await pool.getConnection();

  try {

    const store = await repo.findById(conn, id);

    if (!store)
      throw new Error("Store tidak ditemukan");

    return store;

  } finally {

    conn.release();

  }

};

exports.store = async (payload, user) => {

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    const duplicate = await repo.findByName(
      conn,
      payload.name
    );

    if (duplicate)
      throw new Error("Nama store sudah digunakan");

    const id = await repo.create(conn, {
      name: payload.name,
      user_role_id: payload.user_role_id,
      created_by: user.id
    });

    await conn.commit();

    return await repo.findById(conn, id);

  } catch (err) {

    await conn.rollback();

    throw err;

  } finally {

    conn.release();

  }

};