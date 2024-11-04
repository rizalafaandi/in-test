import { AuthData } from "@/hooks/useAuthSubmit";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseOauth = (submit: (data: AuthData) => Promise<void>) => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Set persistence
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("stuff persitance");
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("berhasil ", result.user);
      await submit?.({
        email: result.user.email || "",
        displayName: result?.user.displayName || "",
        sign_method: "google",
      });
    } catch (error) {
      console.error("Kesalahan saat masuk:", error);
    }
  };

  return { loginWithGoogle };
};

export { firebaseOauth };
