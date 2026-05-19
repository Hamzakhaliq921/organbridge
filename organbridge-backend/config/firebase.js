const admin = require("firebase-admin");

let firebaseApp;

const initFirebase = () => {
  if (firebaseApp) return firebaseApp;

  try {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_KEY, "base64").toString("utf8")
    );

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ Firebase Admin initialized");
    return firebaseApp;
  } catch (err) {
    console.error("❌ Firebase init error:", err.message);
    // Non-fatal — app still works with JWT auth
  }
};

module.exports = { admin, initFirebase };

