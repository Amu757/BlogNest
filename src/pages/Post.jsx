import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "../components/Loder";
import "./pages.css";

export default function Post() {
  const [loding, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [path, setPath] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.data);
  let idinsidepost, idinsideuserdata, isAuthor;

  if (post && userData) {
    idinsidepost = post.userId;
    if (userData.data) idinsideuserdata = userData.data.$id;
    else idinsideuserdata = userData.$id;

    if (idinsidepost === idinsideuserdata) isAuthor = true;
    else isAuthor = false;
  }

  let fetched = false;
  useEffect(() => {
    if (slug) {
      if (!fetched) {
        appwriteService.getPost(slug).then((post) => {
          if (post) {
            setPost(post);
            fetched = true;
            setLoading(false);
          } else navigate("/");

          if (post.title === "Bali Travel Guide")
            setPath("/blogsimages/bali.jpg");
          else if (post.title === "Argentina travel")
            setPath("/blogsimages/argentina.jpg");
          else if (post.title === "Mexico travel")
            setPath("/blogsimages/mexico.jpg");
          else if (post.title === "Peru travel")
            setPath("/blogsimages/peru.jpg");
          else if (post.title === "Brazil travel")
            setPath("/blogsimages/brazil.jpg");
          else if (path === null) {
            setPath(appwriteService.getFilePreview(post.featuredImage));
          }
        });
      }
    } else navigate("/");
  }, [slug]);

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
          // src={appwriteService.getFilePreview(post.featuredImage)}
          src={path}
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
  ) : (
    <Loader />
  );
}
