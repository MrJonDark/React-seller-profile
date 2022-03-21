const { admin, firebase } = require("./firebaseConfig");
module.exports = (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer", "").trim()
    : null;
  var user = firebase.auth().currentUser;

  try {
    if (user && token) {
      admin
        .auth()
        .verifyIdToken(token)
        .then(function (decodedToken) {
          if (decodedToken.uid === user.uid) {
            req.user = user.uid;
            return next();
          }
        })
        .catch(function (error) {
          res.status(401).json({ msg: "Token is not valid" });
        });
    } else {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
  } catch (error) {
    return res.status(422).json({ errors: error.message });
  }
};
