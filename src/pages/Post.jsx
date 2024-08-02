import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./pages.css";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.data);

  const isAuthor = post && userData ? post.userId === userData.data.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    let confirmDelete = confirm("Want to delete the post?");
    try {
      if (confirmDelete) {
        appwriteService.deletePost(post.$id).then((status) => {
          if (status) {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/");
          } else {
            console.log("something wrong");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return post ? (
    <div className="post-room">
      <div className="post-banner">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
        />

        {isAuthor && (
          <div className="buttons-container">
            <Link to={`/edit-post/${post.$id}`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={deletePost}>Delete</Button>
          </div>
        )}
      </div>
      <div className="bottom-container">
        <div className="title-box">
          <h1 className="title">{post.title}</h1>
        </div>
        <div className="postcontent">{parse(post.content)}</div>
      </div>
    </div>
  ) : null;
}
