const service = require("./store.service");

exports.index = async (req, res, next) => {

  try {

    const data = await service.index();

    res.json({
      success: true,
      data
    });

  } catch (err) {
    next(err);
  }

};

exports.show = async (req, res, next) => {

  try {

    const data = await service.show(req.params.id);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    next(err);
  }

};

exports.store = async (req, res, next) => {

  try {

    const data = await service.store(
      req.body,
      req.userInfo
    );

    res.status(201).json({
      success: true,
      data
    });

  } catch (err) {

    next(err);

  }

};

exports.update = async (req, res, next) => {

  try {

    const data = await service.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json({
      success: true,
      data
    });

  } catch (err) {

    next(err);

  }

};

exports.destroy = async (req, res, next) => {

  try {

    await service.destroy(
      req.params.id,
      req.user
    );

    res.json({
      success: true
    });

  } catch (err) {

    next(err);

  }

};