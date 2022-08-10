
const newUser = (req, res, next) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error ('Falta campos obligatorios');
      error.httpStatus = 400;
      throw error;
    }
    res.send({
      Status: 'Ok',
      mail: email,
      contraseña: password, 
    })

  } catch (error) {
    next(error);
  }

}

module.exports = newUser;