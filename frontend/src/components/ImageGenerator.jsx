import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

const ImageGenerator = () => {
  const [height, setHeight] = useState(512);
  const [width, setWidth] = useState(512);
  const [seed, setSeed] = useState(45);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("flux");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://image-generator-backend-taupe.vercel.app/generate-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, width, height, seed, model }),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setImage(data.imageUrl);
        setPrompt("");
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(`Error generating data ${error.message}`);
      setError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetchData();
  };

  setTimeout(() => {
    setLoading(false);
    setImage("");
  }, 5000);

  return (
    <div className="min-h-screen bg-slate-950 w-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white mt-8 w-full text-center">
          AI{" "}
          <span className="text-pink-800 animate-pulse font-sans">
            Image Generator
          </span>
        </h1>
      </div>
      <div className="min-h-screen justify-center flex flex-col items-center mt-8 ">
        <form className="" onSubmit={handleSubmit}>
          <div className="mt-7">
            <label className="m-2 text-lg text-white">Prompt:</label>
            <input
              type="text"
              value={prompt}
              placeholder="Enter your prompt text..."
              className="p-1 bg-gray-900 text-white"
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="mt-7">
            <label className="m-2 text-lg text-white">Width:</label>
            <input
              type="number"
              placeholder="Enter your desired width..."
              className="p-1 bg-gray-900 text-white"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="mt-7">
            <label className="m-2 text-lg text-white">Height:</label>
            <input
              type="number"
              placeholder="Enter your desired height..."
              className="p-1 bg-gray-900 text-white"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="mt-7">
            <label className="m-2 text-lg text-white">Seeds:</label>
            <input
              type="number"
              placeholder="enter seed"
              className="p-1 bg-gray-900 text-white"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
          </div>
          <div className="mt-7">
            <label className="m-2 text-lg text-white">Model:</label>
            <select
              className="p-3 bg-gray-900 text-white"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="flux">FLux</option>
              <option value="model1">Model 1</option>
              <option value="model2">Model 2</option>
            </select>
          </div>
          <div className="text-center mt-5">
            <button className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition duration-200">
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
        {error && <p>Error generating data...</p>}
        {image && (
          <img
            src={image}
            alt="Generated AI Art"
            className="mt-8 translate duration-100 ease-in-out"
          />
        )}

        <Carousel />
      </div>
    </div>
  );
};
export default ImageGenerator;
