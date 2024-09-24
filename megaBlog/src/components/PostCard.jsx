import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// $id used instead of id due to different syntax followed by appwrite
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl "
          ></img>
        </div>
        {/* yahan pe featuredImage function call mein video mein id nahi paas ki aur balki uss ke bajaye kuch bol gaye 12:55 pe dekh ke theek karo */}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
