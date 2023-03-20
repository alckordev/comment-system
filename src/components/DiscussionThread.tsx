import { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { getCommentsByThread } from "@/lib/firebase-utils";
import * as fbdb from "firebase/database";
import { database } from "@/lib/firebase";
import { Editor } from "./Editor";
import { Comment } from "./Comment";

export const DiscussionThread = ({ identifier }: { identifier: string }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    // Get all comments by thread
    async function loadComments() {
      const data = await getCommentsByThread(identifier);

      if (!data) return;

      setComments(data.reverse());
    }

    loadComments();

    // Watching new comments
    const commentRef = fbdb.ref(database, "comments");

    const endpoint = fbdb.query(
      commentRef,
      fbdb.orderByChild("thread"),
      fbdb.equalTo(identifier)
    );

    fbdb.onChildAdded(endpoint, (snapshot) => {
      const newComment = { ...snapshot.val(), key: snapshot.key };
      const existingComment = comments.find((c) => c.key === newComment.key);

      if (existingComment) return;

      setComments((prevComments) => [newComment, ...prevComments]);
    });

    return () => {
      // Stop watching when component is unmounted
      fbdb.off(endpoint, "child_added");
    };
  }, [identifier]);

  return (
    <Chakra.Box>
      <Editor thread={identifier} />
      <Chakra.Divider borderColor="gray.500" my={8} />
      <Chakra.VStack divider={<Chakra.StackDivider />} spacing={6}>
        {comments.map((comment) => (
          <Comment key={comment.key} thread={identifier} comment={comment} />
        ))}
      </Chakra.VStack>
    </Chakra.Box>
  );
};
