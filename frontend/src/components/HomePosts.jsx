import PropTypes from "prop-types";
import {IF} from '../url'

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        {!post.photo ? (
          <img
            src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        ) : (
          <img src={IF + post.photo} className="h-full w-full object-cover" alt="" />
        )}
      </div>
      
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-xs lg:text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-xs lg:text-sm">
            <p>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.desc.length > 200 ? post.desc.slice(0, 200) + "..." : post.desc}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;

HomePosts.propTypes = {
  post: PropTypes.node.isRequired,
};
