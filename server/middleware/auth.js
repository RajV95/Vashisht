import admin from "firebase-admin";

// Initialize Firebase Admin SDK (only once in your backend)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_API_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const authenticateFirebaseUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers
    // console.log("tokwn", token);
    // console.log("req headser", req.headers);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // ✅ Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log(decodedToken);
    // ✅ Attach UID to req.user_id for future routes
    req.user_id = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
export default authenticateFirebaseUser