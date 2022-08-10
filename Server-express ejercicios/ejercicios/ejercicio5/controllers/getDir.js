
const getDir = (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      Directorio: __dirname,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = getDir;