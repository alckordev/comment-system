import * as Chakra from "@chakra-ui/react";
import { auth } from "@/lib/firebase";

export const SignOut = () => {
  const toast = Chakra.useToast();

  const handleSignOut = async () => {
    try {
      await auth.signOut();

      toast({ description: "¡Goodbye! 👋." });
    } catch (error) {
      toast({
        description: "¡Oops! Something went wrong.",
        status: "error",
      });
    }
  };

  return <Chakra.Button onClick={handleSignOut}>Cerrar sesión</Chakra.Button>;
};
