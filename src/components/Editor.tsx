import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatISO } from "date-fns";
import * as fbdb from "firebase/database";
import { database } from "@/lib/firebase";

export const Editor = ({
  thread,
  placeholder = "Únete a la conversación...",
}: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        author_name: yup.string().required(),
        author_email: yup.string().email().required(),
        message: yup.string().min(2).required(),
      })
    ),
  });

  const toast = Chakra.useToast();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const commentRef = fbdb.push(fbdb.ref(database, "comments"));

      await fbdb.set(commentRef, {
        thread,
        author: {
          name: values.author_name,
          email: values.author_email,
        },
        message: values.message,
        createdAt: formatISO(new Date()),
      });

      reset({ message: "" });
    } catch (err) {
      toast({
        description: "¡Oops! Something went wrong.",
        status: "error",
      });
    }
  });

  return (
    <Chakra.VStack minW="100%" as="form" onSubmit={onSubmit}>
      <Chakra.FormControl isInvalid={errors.author_name ? true : false}>
        <Chakra.Input
          placeholder="Name"
          size="sm"
          {...register("author_name")}
        />
      </Chakra.FormControl>
      <Chakra.FormControl isInvalid={errors.author_email ? true : false}>
        <Chakra.Input
          placeholder="E-mail"
          size="sm"
          {...register("author_email")}
        />
      </Chakra.FormControl>
      <Chakra.FormControl isInvalid={errors.message ? true : false}>
        <Chakra.Textarea
          placeholder={placeholder}
          size="sm"
          resize="none"
          {...register("message")}
        />
      </Chakra.FormControl>
      <Chakra.Button type="submit" isLoading={isSubmitting}>
        Comentar
      </Chakra.Button>
    </Chakra.VStack>
  );
};
