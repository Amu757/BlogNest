import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import "./components.css";

function PostCard({ $id, title, featuredImage }) {
  console.log("inside post card got $id, " , $id)
  let path = "";
  if (title == "Bali Travel Guide") path = "/blogsimages/bali.jpg";
  else if (title == "Argentina travel") path = "/blogsimages/argentina.jpg";
  else if (title == "Mexico travel") path = "/blogsimages/mexico.jpg";
  else if (title == "Peru travel") path = "/blogsimages/peru.jpg";
  else if (title == "Brazil travel") path = "/blogsimages/brazil.jpg";
  return (
    <Link to={`/post/${$id}`}>
      <div className="postcard">
        <div className="imgcontainer">
          <img
            // src={appwriteService.getFilePreview(featuredImage)}
            src={path}
            alt={title}
          />
        </div>
        <h2 className="title">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
