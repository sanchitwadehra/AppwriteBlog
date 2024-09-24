import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((allposts) => {
      if (allposts) {
        setPosts(allposts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl text-white font-bold hover:text-gray-500">
                {authStatus ? (
                  "Welcome"
                ) : (
                  <button
                    className="underline text-blue-300 hover:text-blue-500"
                    onClick={() => navigate("/login")} // Navigate to /login
                  >
                    Please Login/Signup
                  </button>
                )}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
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
      </Container>
    </div>
  );
}

export default Home;
