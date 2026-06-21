const service = require("./user-role.service");

exports.create = async (req, res, next) => {
  try {

    const payload = req.body;

    if (!payload.user_id) {
      throw new Error("User Id is required");
    }

    if (!payload.role_id) {
      throw new Error("Role Id is required");
    }

    const result = await service.create(
      payload,
      req.userInfo.user_id
    );

    res.status(201).json({
      success: true,
      msg: "User Role Created",
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {

    const result = await service.findAll();

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {

    const result =
      await service.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {

    const result =
      await service.update(
        req.params.id,
        req.body,
        req.userInfo.user_id
      );

    res.status(200).json({
      success: true,
      msg: "User Role Updated",
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {

    await service.remove(
      req.params.id,
      req.userInfo.user_id
    );

    res.status(200).json({
      success: true,
      msg: "User Role Deleted"
    });

  } catch (err) {
    next(err);
  }
};