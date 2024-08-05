import React, { useEffect, useState } from "react";
import { PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loder";
import "./pages.css"
function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loding,setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
          setLoading(false)
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="postform-container">
      <PostForm post={post} />
    </div>
  ) : <Loader/>
}

export default EditPost;
