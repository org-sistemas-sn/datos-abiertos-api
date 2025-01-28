const setRequestOrigin = (req, res, next) => {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
};

export default setRequestOrigin;
