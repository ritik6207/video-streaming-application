import { Toast } from "flowbite-react";
import { VideoUpload } from "./components/VideoUpload";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-9 justify-center py-9">
        <h1 className=" text-gray-700 font-bold p=4 text-2xl  dark:text-gray-100">
          Video Streaming App
        </h1>
        <VideoUpload />
      </div>
    </>
  );
}

export default App;
