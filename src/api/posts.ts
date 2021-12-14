import { PostDetails } from "types";

export const fetchAllPosts = async () => {
  const posts: PostDetails[] = await getJson(
    "https://cf-general.xingxiang.workers.dev/posts"
  );

  // Sort posts in descending id
  const sorter = (a: PostDetails, b: PostDetails) => (b.id || 0) - (a.id || 0);
  return posts.sort(sorter);
};

export const fetchPost = async (id: number) => {
  const post: PostDetails = await getJson(
    `https://cf-general.xingxiang.workers.dev/posts/${id}`
  );
  return post;
};

export const updatePost = async (post: PostDetails) => {
  console.log("Updating post with: ", JSON.stringify(post));
  try {
    const response = await fetch(
      "https://cf-general.xingxiang.workers.dev/posts",
      {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(post), // body data type must match "Content-Type" header
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post: PostDetails) => {
  const response = await fetch(
    "https://cf-general.xingxiang.workers.dev/posts",
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(post), // body data type must match "Content-Type" header
    }
  );
};

const getJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Unexpected HTTP Response");
  }
  return await res.json();
};
