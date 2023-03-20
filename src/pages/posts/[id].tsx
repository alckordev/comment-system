import { getThread } from "@/lib/firebase-utils";

export default function Post({ post, thread }: any) {
  console.log(thread);
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
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

  // get thread
  const thread = await getThread(params.id);

  return {
    props: { post, thread },
  };
}
