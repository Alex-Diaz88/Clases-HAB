
const getTime = (req, res, next) => {
  try {
    let hour = new Date().getHours();

    res.send({
      status: 'ok',
      hora: hour,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = getTime;