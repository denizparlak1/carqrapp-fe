import { signInWithEmailAndPassword as signIn } from "firebase/auth";
import { sendPasswordResetEmail as passwordReset } from "firebase/auth"
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

export const resetPasswordWithEmail = async (email) => {
    try {
        await passwordReset(auth,email);
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
};

export const signOut = async () => {
    return await auth.signOut();
};
