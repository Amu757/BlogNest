import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./pages.css";
function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!loggedIn) null//navigate("/login");
    else {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="home-container">
        <div className="banner">
          <img src="/banner.png" alt="" />
        </div>

        <h3 className="loader">Get Started Queckly With Login</h3>
      </div>
    );
  }
  return (
    <div className="home-container">
      <div className="posts-container">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
