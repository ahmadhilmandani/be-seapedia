const repo = require("./userReview.repository");


exports.index = () => repo.findAll();

exports.show = async (id) => {

    const review = await repo.findById(id);

    if (!review)
        throw new Error("Review tidak ditemukan");

    return review;

};

exports.store = async (payload, user) => {

    let data = {};

    if (user) {

        data.user_id = user.id;
        data.reviewer_name = user.name;
        data.reviewer_role = "Buyer";

    } else {

        if (!payload.reviewer_name)
            throw new Error("Nama wajib diisi");

        data.user_id = null;
        data.reviewer_name = payload.reviewer_name;
        data.reviewer_role = "Buyer";

    }

    data.rating = payload.rating;
    data.comment = payload.comment;

    return repo.create(data);

};

exports.update = async (id, payload, user) => {

    const review = await repo.findById(id);

    if (!review)
        throw new Error("Review tidak ditemukan");

    let data = {};

    if (user) {

        data.reviewer_name = user.name;
        data.reviewer_role = user.active_role;

    } else {

        if (!payload.reviewer_name)
            throw new Error("Nama wajib diisi");

        data.reviewer_name = payload.reviewer_name;
        data.reviewer_role = "buyer";

    }

    data.rating = payload.rating;
    data.comment = payload.comment;

    await repo.update(id, data);

    return repo.findById(id);

};

exports.destroy = async (id) => {

    const review = await repo.findById(id);

    if (!review)
        throw new Error("Review tidak ditemukan");

    return repo.destroy(id);

};