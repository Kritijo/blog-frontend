const Thumbnail = ({ thumbnail }) => {
  return (
    <div
      className="w-full h-[25vh] bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden mb-5"
      onClick={() => setShowUnsplashPicker(true)}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-500">Add a thumbnail</span>
      )}
    </div>
  );
};

export default Thumbnail;
