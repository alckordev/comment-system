import * as Chakra from "@chakra-ui/react";
import { getThread } from "@/lib/firebase-utils";
import { DiscussionThread } from "@/components/DiscussionThread";

export default function Post({ post, thread }: any) {
  console.log(thread);
  return (
    <Chakra.Container>
      <Chakra.Heading my={8}>{post.title}</Chakra.Heading>
      <Chakra.Box>{post.body}</Chakra.Box>
      <Chakra.Divider borderColor="gray.500" my={8} />
      <DiscussionThread identifier={thread.key} />
    </Chakra.Container>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: any) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  // Get thread
  const thread = await getThread(params.id);

  return {
    props: { post, thread },
  };
}
