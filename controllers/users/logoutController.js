const User = require("../../model/User");

const handleLogout = async (req, res) => {
  // on client also delete accesstoken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  // is refresh token in db
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); //no content
  }
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //secure: true -only serves https
  res.sendStatus(204);
};

module.exports = { handleLogout };
