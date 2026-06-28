const pool = require("../../config/db");
const repo = require("./store.repository");
const addressRepo = require('../addresses/addresses.repository')

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
      throw new Error("Store is not found!");

    return store;

  } finally {

    conn.release();

  }

};

exports.findByName = async (name) => {

  const conn = await pool.getConnection();

  try {

    const store = await repo.findByName(conn, name);

    if (!store)
      throw new Error("Store is not found!");

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

exports.update = async (id, payload, user) => {

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    const store = await repo.findById(conn, id);

    if (!store)
      throw new Error("Store is not found!");

    const duplicate = await repo.findByName(
      conn,
      payload.name
    );

    if (duplicate && duplicate.id != id)
      throw new Error("Nama store sudah digunakan");

    await repo.update(
      conn,
      id,
      {
        name: payload.name,
        updated_by: user.user_id
      }
    );

    await addressRepo.update(
      conn,
      payload.address_id,
      {
        user_role_id: store.user_role_id,
        street_name: payload.street_name,
        house_number: payload.house_number,
        subdistrict: payload.subdistrict,
        regency: payload.regency,
        province: payload.province,
        postal_code: payload.postal_code,
        additional_note: payload.additional_note
      },
      user.user_id
    );

    await conn.commit();

    return await repo.findById(conn, id);

  } catch (err) {

    await conn.rollback();

    throw err;

  } finally {

    conn.release();

  }

};

