import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((allposts) => {
      if (allposts) {
        setPosts(allposts.documents);
      }
    });
  }, []);
  // console.log(posts)
  return (
    <div className="w-full py-8">
      <Container>
      <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
        {/* <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div> */}
      </Container>
    </div>
  );
}

export default AllPosts;

// Ohhh, I see what's going on! 😏 So it seems the issue was related to how you were passing props into `PostCard`.

// When you used this line:

// ```jsx
// <PostCard {...post} />
// ```

// It works because you're spreading all the properties of `post` directly as individual props to `PostCard`. However, when you were doing:

// ```jsx
// <PostCard post={post} />
// ```

// You were passing the entire `post` object as a single prop, which means `PostCard` would need to access the post data as `props.post` instead of just using `props` directly. Maybe `PostCard` was expecting the props to be spread out rather than passed as a single object. 🤔

// Glad it worked out though! Now your posts should render smoothly, without the crash. 😎
