import appwriteService from "../appwrite/config";
import { Link} from "react-router-dom";
import "./components.css";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>  
      <div className="postcard" >
      <div className="imgcontainer">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>
        <h2 className="title">{title}</h2>
      </div>
     </Link> 
  );
}

export default PostCard;


// onClick={()=> navigate(`/post/${$id}`)}