import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";
// import Feature1SVG from './path-to-svg/feature1.svg'; // Replace with actual paths
// import Feature2SVG from './path-to-svg/feature2.svg';
// import Feature3SVG from './path-to-svg/feature3.svg';


function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File Converted Successfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDownloadError(`Error occurred: ${error.response.data.message}`);
      } else {
        setConvert("");
      }
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
        {/* Conversion Section */}
        <div className="flex h-screen items-center justify-center">
          <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4 text-indigo-950">
              Convert Word to PDF Online
            </h1>
            <p className="text-sm text-center mb-5 text-indigo-900">
              Easily convert Word documents to PDF format online, without having
              to install any software.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                accept=".doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="FileInput"
              />
              <label
                htmlFor="FileInput"
                className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-green-300 hover:bg-green-500 duration-300 hover:text-white"
              >
                <FaFileWord className="text-3xl mr-2" />
                <span className="text-2xl mr-2 ">
                  {selectedFile ? selectedFile.name : "Choose File"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className="text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
              >
                Convert File
              </button>
              {convert && (
                <div className="text-green-500 text-center font-bold">
                  {convert}
                </div>
              )}
              {downloadError && (
                <div className="text-red-500 text-center font-bold">
                  {downloadError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className='border-gray-400' />
      <div>
        {/* Capabilities Section */}
        <div className="py-12 flex flex-col">
          <h2 className="text-4xl font-bold text-center mb-4 text-indigo-950">
            What Our Website Can Do
          </h2>
          <div className="flex flex-col gap-8 justify-center align-middle">
            {/* Feature 1 */}
            <div className="flex flex-row items-center justify-evenly bg-indigo-200 ml-20 mr-20 rounded-full">
              <img src="/assets/pdf1.svg" alt="Feature 1" className="w-200 h-300" />
              <div className="text-left">
                <h3 className="text-3xl font-semibold text-indigo-950">Convert Files</h3>
                <ul className="list-disc text-lg text-gray-700 ml-6 mt-2">
                  <li>Quick and Reliable</li>
                  <li>Maintains Formatting</li>
                  <li>No Software Needed</li>
                </ul>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-row items-center justify-evenly bg-indigo-200 ml-20 mr-20 rounded-full">
              <div className="text-left">
                <h3 className="text-3xl font-semibold text-indigo-950">Secure Upload</h3>
                <ul className="list-disc text-lg text-gray-700 ml-6 mt-2">
                  <li>End-to-End Encryption</li>
                  <li>No Data Retention</li>
                  <li>Trusted Infrastructure</li>
                </ul>
              </div>
              <img src="/assets/pdf2.svg" alt="Feature 2" className="w-240 h-240" />
            </div>
            {/* Feature 3 */}
            <div className="flex flex-row items-center justify-evenly bg-indigo-200 ml-20 mr-20 rounded-full">
              <img src="/assets/pdf3.svg" alt="Feature 3" className="w-200 h-200" />
              <div className="text-left">
                <h3 className="text-3xl font-semibold text-indigo-950">Easy to Use</h3>
                <ul className="list-disc text-lg text-gray-700 ml-6 mt-2">
                  <li>User-Friendly Interface</li>
                  <li>Drag-and-Drop Functionality</li>
                  <li>Accessible Anywhere</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;
