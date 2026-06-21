// addresses.controller.js

const service = require("./addresses.service");

exports.create = async (req, res, next) => {
  try {

    const payload = req.body;

    if (!payload.user_role_id)
      throw new Error("User Role is required");

    if (!payload.street_name?.trim())
      throw new Error("Street Name is required");

    if (!payload.house_number?.trim())
      throw new Error("House Number is required");

    if (!payload.subdistrict?.trim())
      throw new Error("Subdistrict is required");

    if (!payload.regency?.trim())
      throw new Error("Regency is required");

    if (!payload.province?.trim())
      throw new Error("Province is required");

    if (!payload.postal_code?.trim())
      throw new Error("Postal Code is required");

    const result = await service.create(
      payload,
      req.userInfo.user_id
    );

    res.status(201).json({
      success: true,
      msg: "Address Created",
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {

    const result =
      await service.findAll();

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
      await service.findById(
        req.params.id
      );

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
      msg: "Address Updated",
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
      msg: "Address Deleted"
    });

  } catch (err) {
    next(err);
  }
};