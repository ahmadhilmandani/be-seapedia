const pool  = require("../../config/db");


exports.findAll = async () => {

    const [rows] = await pool.query(`
        SELECT *
        FROM user_review
        WHERE is_delete=0
        ORDER BY created_at DESC
        LIMIT 10
    `);

    return rows;

};

exports.findById = async (id) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM user_review
        WHERE id=?
        AND is_delete=0
    `, [id]);

    return rows[0];

};

exports.create = async (data) => {

    const [result] = await pool.query(`
        INSERT INTO user_review
        (
            user_id,
            reviewer_name,
            reviewer_role,
            rating,
            comment
        )
        VALUES
        (?,?,?,?,?)
    `,
    [
        data.user_id,
        data.reviewer_name,
        data.reviewer_role,
        data.rating,
        data.comment
    ]);

    return this.findById(result.insertId);

};

exports.update = async (id, data) => {

    await pool.query(`
        UPDATE user_review
        SET
            reviewer_name=?,
            reviewer_role=?,
            rating=?,
            comment=?,
            updated_at=NOW()
        WHERE id=?
    `,
    [
        data.reviewer_name,
        data.reviewer_role,
        data.rating,
        data.comment,
        id
    ]);

};

exports.destroy = async (id) => {

    await pool.query(`
        UPDATE user_review
        SET
            is_delete=1,
            updated_at=NOW()
        WHERE id=?
    `,[id]);

};