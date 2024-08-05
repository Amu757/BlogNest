import React, { useState, useEffect } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import Loader from "../components/Loder";
import "./pages.css";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userInfo = useSelector((state) => state.auth.data);
  const [loding, setLoading] = useState(true);
  useEffect(() => {
    if (userInfo && userInfo.data && userInfo.data.$id) {
      appwriteService.getPosts(userInfo.data.$id).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          setLoading(false);
        }
      });
    }
  }, [userInfo]);
  return (
    <div className="home-container">
      <div className="posts-container">
        {posts.length !== 0 ? (
          posts.map((post) => <PostCard {...post} key={post.slug} />)
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default AllPosts;
