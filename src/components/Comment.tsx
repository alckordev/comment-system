import { AuthContext } from "@/store/AuthProvider";
import * as Chakra from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { useContext, useState } from "react";
import { Editor } from "./Editor";

export const Comment = ({ thread, comment, ...rest }: any) => {
  const user = useContext(AuthContext);

  const [isReplyListCollased, setIsReplyListCollased] = useState(false);
  const [isReplyFormCollased, setIsReplyFormCollased] = useState(false);

  const replyListToggle = () => setIsReplyListCollased(!isReplyListCollased);
  const replyFormToggle = () => setIsReplyFormCollased(!isReplyFormCollased);

  return (
    <Chakra.VStack w="100%" spacing={8}>
      <Chakra.Box minW="100%" {...rest}>
        <Chakra.VStack align="flex-start" spacing={4}>
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

          <Chakra.HStack w="100%" justify="flex-end">
            {comment.children && comment.children.length > 0 && (
              <Chakra.Button size="sm" variant="link" onClick={replyListToggle}>
                {!isReplyListCollased
                  ? `${comment.children.length} Respuestas`
                  : `Ocultar respuestas`}
              </Chakra.Button>
            )}

            {user && (
              <Chakra.Button size="sm" variant="link" onClick={replyFormToggle}>
                Responder
              </Chakra.Button>
            )}
          </Chakra.HStack>
        </Chakra.VStack>
      </Chakra.Box>

      <Chakra.Collapse in={isReplyFormCollased} style={{ width: "100%" }}>
        <Chakra.Box
          w="calc(100% - 2rem)"
          ml="auto"
          borderLeft="5px solid"
          borderColor="gray.300"
          pl={4}
        >
          <Editor
            placeholder={`Respondiendo a ${comment.author.name}...`}
            thread={thread}
            parent={comment.key}
            onCancel={replyFormToggle}
          />
        </Chakra.Box>
      </Chakra.Collapse>

      <Chakra.Collapse in={isReplyListCollased} style={{ width: "100%" }}>
        <Chakra.VStack
          divider={<Chakra.StackDivider borderColor="gray.500" />}
          w="calc(100% - 2rem)"
          ml="auto"
          borderLeft="5px solid"
          borderColor="gray.300"
          pl={4}
          spacing={6}
        >
          {comment.children.map((child: any) => (
            <Comment
              key={`child-${child.key}`}
              thread={thread}
              comment={child}
            />
          ))}
        </Chakra.VStack>
      </Chakra.Collapse>
    </Chakra.VStack>
  );
};
