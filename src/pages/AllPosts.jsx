import { useState, useEffect } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import Loader from "../components/Loder";
import "./pages.css";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userId ) {
      appwriteService.getPosts(userId, false).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          setLoading(false);
        }
      });
    }else{
      setPosts([])
      setLoading(false)
    }
  }, [userId]);
  return (
    <div className="home-container">
      <div className="posts-container">
        {loading ? <Loader /> :
        posts.length !== 0 ? (
          posts.map((post) => <PostCard {...post} key={post.title} />)
        ) : (
          <h2>No posts found</h2>
        )}
      </div>
    </div>
  );
}

export default AllPosts;
