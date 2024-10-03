import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadImage, setDownloadImage] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://image-generator-backend-taupe.vercel.app/get-images"
        );
        const data = await res.json();
        console.log(data.images);
        setLoading(false);

        setImages(data.images);
        setDownloadImage(true);
      } catch (error) {
        console.log(`Error fetching images: ${error.message}`);
        setLoading(false);
      }
    };
    setLoading(true);
    fetchImages();
    // Set up an interval to refetch images every 8 seconds
    const interval = setInterval(fetchImages, 8000); // Refresh every 8 seconds

    // Clean up interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://image-generator-backend-taupe.vercel.app/delete-image/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.data.message);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 p-4 mt-8">
      {loading ? (
        <p>Loading images...</p>
      ) : images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={image.image}
              alt={`Image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            {downloadImage && (
              <a
                href={image}
                download="generated-image.jpg"
                className="mt-4 animate-pulse bg-red-800 rounded-lg px-2 py-1 text-white"
              >
                Download Image
              </a>
            )}
            <button
              onClick={() => handleDelete(image._id)}
              className="m-2 bg-green-900 p-1 rounded-lg gover:bg-green-600
              "
            >
              Delete
            </button>
            <div className="p-4"></div>
          </div>
        ))
      ) : (
        <p>No images found</p>
      )}
    </div>
  );
};

export default Carousel;
