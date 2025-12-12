import { auth, db, } from "@/app/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "Users", user.uid), {
    name,
    email,
    createdAt: new Date(),
  });

  return user;
};

