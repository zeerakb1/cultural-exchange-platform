import PropTypes from "prop-types";
import { IF } from "../url";

const PostCard = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 bg-txt">
      <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.14)] dark:bg-neutral-700 md:max-w-xxl md:flex-row">
        {!post.photo ? (
          <img
            src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
            className="h-64 w-[50%] rounded-t-lg object-cover md:rounded-none md:rounded-l-lg"
            alt=""
          />
        ) : (
          <img
            src={IF + post.photo}
            className="h-64 w-96 rounded-t-lg object-cover md:rounded-none md:rounded-l-lg"
            alt=""
          />
        )}
        <div className="flex flex-col justify-start p-6">
          <h3 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {post.title}
          </h3>
          <div className="flex mb-2 text-xs lg:text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>@{post.username}</p>
            <div className="text-xs text-neutral-500 dark:text-neutral-300">
              <p>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
            </div>
          </div>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {post.desc.length > 250
              ? post.desc.slice(0, 250) + "..."
              : post.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

PostCard.propTypes = {
  post: PropTypes.node.isRequired,
};
