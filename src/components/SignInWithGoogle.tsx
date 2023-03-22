import * as Chakra from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const SignInWithGoogleButton = () => {
  const toast = Chakra.useToast();

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithRedirect(auth, provider);
    } catch (err) {
      toast({
        description: "¡Oops! Something went wrong.",
        status: "error",
      });
    }
  };

  return <Chakra.Button onClick={handleSignIn}>Iniciar sesión</Chakra.Button>;
};
