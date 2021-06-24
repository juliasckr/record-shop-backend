const recordsModel = require("../model/RecordSchema");
const createError = require("http-errors");

exports.getRecords = async (req, res, next) => {
  try {
    let records = await recordsModel.find({});
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

exports.getRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await recordsModel.findById(id);
    if (record) {
      return res.json({ success: true, data: record });
    } else {
      next(new createError.BadRequest("no record found in db"));
    }
  } catch (err) {
    next(err);
  }
};

exports.postRecord = async (req, res, next) => {
  try {
    const record = new recordsModel(req.body);
    await record.save();
    res.send({ success: true, data: record });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.patchRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    //update record in our records collection
    const record = await RecordsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await recordsModel.findByIdAndDelete(id);
    res.send({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};
