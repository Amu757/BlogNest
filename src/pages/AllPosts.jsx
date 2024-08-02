import React, { useState, useEffect } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/config";
import "./pages.css"
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="home-container">
      <div className="posts-container">
        {posts.length !== 0 ? (
          posts.map((post) => <PostCard {...post} key={post.slug} />)
        ) : (
          <h2 className="loader">NO DATA FOUND</h2>
        )}
      </div>
    </div>
  );
}

export default AllPosts;
