// import axios from "axios";
// import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md";
// import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PropTypes from "prop-types";

const Comment = ({ c, deleteComment }) => {
  const { user } = useContext(UserContext);
  
  
  // const deleteComment = async (id) => {
  //   try {
  //     await axios.delete(URL + "/api/comments/" + id, {
  //       withCredentials: true,
  //     });
  //     window.location.reload(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  return (
    <div className="px-2 py-2 bg-tertiary rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-txt">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4 mr-2 text-txt">
          <p>{new Date(c.updatedAt).toString().slice(3, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 21)}</p>
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2 ">
              <p
                className="cursor-pointer"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-2 mt-3 mb-2 text-txt">{c.comment}</p>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  c: PropTypes.node.isRequired,
  post: PropTypes.node.isRequired,
  deleteComment: PropTypes.node.isRequired,
  
};
