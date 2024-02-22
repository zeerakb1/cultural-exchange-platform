const HomePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1698860631" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            Counter-Strike 2 on Steam
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@username</p>
          <div className="flex space-x-2 text-sm">
            <p>21/02/2024</p>
            <p>11:46:03 pm</p>
            {/* <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p> */}
            {/* <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p> */}
          </div>
        </div>
        <p className="text-sm md:text-lg">
            For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2. A free upgrade to CS:GO, Counter-Strike 2 marks the largest technical leap in Counter-Strike’s history. Built on the Source 2 engine, Counter-Strike 2 is modernized with realistic physically-based rendering, state of the art networking, and upgraded Community Workshop tools.
          {/* {post.desc.slice(0, 200) + " ...Read more"} */}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
