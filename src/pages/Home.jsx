/* eslint-disable no-useless-catch */
import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";
import { useSelector } from "react-redux";
import "./pages.css";
import Loader from "../components/Loder";

function Home() {
  const [posts, setPosts] = useState([]);
  const loggedIn = useSelector((state) => state.auth.status);
  const userId = useSelector((state) => state.auth.id);
  const [loding, setLoading] = useState(false);

  useEffect(() => {
    if (!loggedIn) setLoading(false);
    else if (loggedIn && userId) {
      setLoading(true);
      appwriteService
        .getPosts(userId)
        .then((docs) => {
          setPosts(docs?.documents);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
    }
  }, [loggedIn, userId]);

  if (loding) {
    return <Loader />;
  } else if (!loggedIn) {
    return (
      <div className="home-container">
        <div className="banner">
          <img src="/banner.png" alt="" />
        </div>
        (<h3 className="loader">Get Started Quickly With Login</h3>)
      </div>
    );
  } else
    return (
      <>
        <div className="home-container">
          <div className="posts-container">
            {posts.length === 0 ? (
              <h2>Add your first blog </h2>
            ) : (
              posts.map((post) => <PostCard key={post.title} {...post} />)
            )}
          </div>
        </div>
      </>
    );
}

export default Home;
