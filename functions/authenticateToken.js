const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://booking-hotel-25ea1.firebaseapp.com",
});

/**
 * Middleware to decode Firebase ID token from request headers.
 * If a valid ID token is present in the request headers, it is decoded
 * and added to the request object as "currentUser".
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  const reqHeders = req.headers?.authorization?.startsWith("Bearer ");
  const eq= "Bearer null" && reqHeders;
  if (header !== eq) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req["currentUser"] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

module.exports = decodeIDToken;
