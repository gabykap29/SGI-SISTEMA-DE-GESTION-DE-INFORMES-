const obtenerUsername = async (req, res) => {
  const username = req.cookies.user;
  return username;
};
module.exports = obtenerUsername;
