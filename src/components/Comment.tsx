import * as Chakra from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

export const Comment = ({ thread, comment, ...rest }: any) => {
  return (
    <Chakra.Box minW="100%" {...rest}>
      <Chakra.VStack align="flex-start">
        <Chakra.Flex gap={4} align="center">
          <Chakra.Avatar
            size="sm"
            name={comment.author.name}
            src={comment.author.picture}
          />
          <Chakra.Box>
            <Chakra.Heading size="sm">{comment.author.name}</Chakra.Heading>
            <Chakra.Text>
              {format(parseISO(comment.createdAt), "d MMMM, yyyy")}
            </Chakra.Text>
          </Chakra.Box>
        </Chakra.Flex>
        <Chakra.Box>{comment.message}</Chakra.Box>
      </Chakra.VStack>
    </Chakra.Box>
  );
};
