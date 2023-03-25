import { signInWithEmailAndPassword as signIn } from "firebase/auth";
import { auth } from "../config/firebase";

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signIn(auth, email, password);
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();
        return { user, customClaims: idTokenResult.claims };

    } catch (error) {
        throw error;
    }
};

export const signOut = async () => {
    return await auth.signOut();
};
