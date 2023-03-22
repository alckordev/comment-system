import { useContext } from "react";
import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatISO } from "date-fns";
import * as fbdb from "firebase/database";
import { database } from "@/lib/firebase";
import { AuthContext } from "@/store/AuthProvider";

export const Editor = ({
  thread,
  parent = null,
  placeholder = "Únete a la conversación...",
  onCancel,
}: {
  thread: string;
  parent: string | null;
  placeholder?: string;
  onCancel?: () => void;
}) => {
  const user = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        message: yup.string().min(2).required(),
      })
    ),
  });

  const toast = Chakra.useToast();

  const onSubmit = handleSubmit(async (values) => {
    if (!user) {
      // Add logic for the case of no user session
      return;
    }

    try {
      const commentRef = fbdb.push(fbdb.ref(database, "comments"));

      await fbdb.set(commentRef, {
        thread,
        author: {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          picture: user.photoURL,
        },
        message: values.message,
        parent: parent,
        createdAt: formatISO(new Date()),
      });

      reset({ message: "" });

      if (onCancel && typeof onCancel === "function") onCancel();
    } catch (err) {
      toast({
        description: "¡Oops! Something went wrong.",
        status: "error",
      });
    }
  });

  return (
    <Chakra.VStack minW="100%" as="form" onSubmit={onSubmit}>
      <Chakra.FormControl isInvalid={errors.message ? true : false}>
        <Chakra.Textarea
          placeholder={placeholder}
          size="sm"
          resize="none"
          {...register("message")}
        />
      </Chakra.FormControl>
      <Chakra.HStack>
        {onCancel && typeof onCancel === "function" && (
          <Chakra.Button onClick={onCancel}>Cancelar</Chakra.Button>
        )}
        <Chakra.Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={!isValid}
        >
          Comentar
        </Chakra.Button>
      </Chakra.HStack>
    </Chakra.VStack>
  );
};
