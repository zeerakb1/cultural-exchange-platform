import PropTypes from "prop-types";
import { IF } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        {/* <img src={IF + p.photo} alt="" className="h-full w-full object-cover" /> */}
        {!p.photo ? (
          <img
            src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        ) : (
          <img
            src={IF + p.photo}
            className="h-full w-full object-cover"
            alt=""
          />
        )}
      </div>

      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(3, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {p.desc.slice(0, 200) + " ...Read more"}
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;

ProfilePosts.propTypes = {
  p: PropTypes.node.isRequired,
};
