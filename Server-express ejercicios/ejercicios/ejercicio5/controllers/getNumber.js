
const getNumber = (req, res, next) => {

  try {
    const { number } = req.params;
    
    if (isNaN(number)) {
      const error = new Error('No es un número');
      error.httpStatus = 400;
      throw error;
    }
    res.send({
      Status: 'Ok',
      Numero: number*2,
    })

  } catch (error) {
    next(error);
  }
};

module.exports = getNumber;