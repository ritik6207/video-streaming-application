import { VideoUpload } from "./components/VideoUpload";
import { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import VideoPlaylist from "./components/VideoPlaylist";
import { set } from "video.js/dist/types/tech/middleware";


function App() {
  const [videoId, setVideoId] = useState(
    "900b73ec-4173-4e15-b21a-ff07fea3365c"
  );

  const [fieldValue, setFieldValue] = useState(null);

  function playVideo(videoId) {
    setVideoId(videoId);
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-9 justify-center py-9">
        <h1 className=" text-gray-700 font-bold p=4 text-2xl  dark:text-gray-100">
          Video Streaming App
        </h1>

        <div className="flex mt-14 w-full justify-around">
          <div>
            <h1 className="text-white text-center mt-2">Playing Video</h1>
            {/* <video
              style={{
                width: 500,
              }}
              // src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
              src="http://localhost:8080/api/v1/videos900b73ec-4173-4e15-b21a-ff07fea3365c/master.m3u8"
              controls
            ></video> */}

            <VideoPlaylist
              src={`http://localhost:8080/api/v1/${videoId}/master.m3u8`}
            ></VideoPlaylist>

            {/* <video
              id="my-video"
              class="video-js"
              controls
              preload="auto"
              width="640"
              height="264"
              // poster="MY_VIDEO_POSTER.jpg"
              data-setup="{}"
            >
              <source
                src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
                type="video/mp4"
              />
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that
                <a
                  href="https://videojs.com/html5-video-support/"
                  target="_blank"
                >
                  supports HTML5 video
                </a>
              </p>
            </video> */}
          </div>

          <VideoUpload />
        </div>
        <div className="my-4 flex space-x-4">
          <TextInput
          onClick={(e) => {
            setFieldValue(e.target.value);
          }}
            name="videoId"
            placeholder="Enter Video Id"
          />
          <Button onClick={()=>{
            setVideoId(fieldValue);
          }}>Play</Button>
        </div>
      </div>
    </>
  );
}

export default App;
