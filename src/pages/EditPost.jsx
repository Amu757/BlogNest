import { useEffect, useState } from "react";
import { PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loder";
import "./pages.css";
function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loding, setLoading] = useState(true);

  useEffect(() => {
    console.log("edit post");
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
          setLoading(false);
        }
      });
    } else {
      alert("post not found please try again");
      navigate("/");
    }
  }, []);

  return (
    <>
      {loding ? (
        <Loader />
      ) : (
        <div className="postform-container">
          <PostForm post={post} />
        </div>
      )}
    </>
  );
}

export default EditPost;
