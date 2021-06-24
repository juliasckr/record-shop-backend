exports.cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, x-auth"
  );
  res.header("Access-Control-Expose-Headers", "x-auth, Content-Type");
  next();
};

//custom  middleware
exports.printTime = (req, res, next) => {
  console.log("time: ", new Date());
  next();
};

exports.clgValue = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("url: ", req.url);
  next();
};
