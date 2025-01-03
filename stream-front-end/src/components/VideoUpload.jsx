import axios from "axios";
import React, { useState } from "react";
import vidoeLogo from "../assets/video-posting.png";
import {
  Alert,
  Button,
  Card,
  Label,
  Progress,
  Textarea,
  TextInput,
} from "flowbite-react";
import toast from "react-hot-toast";
export const VideoUpload = () => {
  const [selectFile, setSelectFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    console.log(event.target.files[0]);
    setSelectFile(event.target.files[0]);
  }

  function formFieldsChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    if (!selectFile) {
      alert("Please select a file");
      return;
    }
    // submit the file to the server
    saveVideoToServer(selectFile, meta);
  }

  function resetForm() {
    setMeta({
      title: "",
      description: "",
    });
    setSelectFile(null);
    setUploadedFile(false);
    // setMessage("")
  }

  // submit fiel to server function
  async function saveVideoToServer(video, videoMetaData) {
    setUploadedFile(true);
    // api call
    try {
      let formData = new FormData();
      formData.append("file", selectFile);
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);

      let response = await axios.post(
        `http://localhost:8080/api/v1/videos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(progress);

            setProgress(progress);
          },
        }
      );

      console.log(response);
      setProgress(0);
      setMessage("Video uploaded successfully" + response.data.videoId);
      setUploadedFile(false);
      toast.success("Video uploaded successfully");
      resetForm();
    } catch (error) {
      console.log(error);
      setMessage("Error uploading file");
      setUploadedFile(false);
      toast.error("Error uploading file");
    }
  }

  return (
    <div className="text-gray-100">
      <Card className="flex flex-col items-center">
        <h1 className="text-gray-900">Upload Videos</h1>
        <div>
          <form
            noValidate
            onSubmit={handleForm}
            className="flex flex-col space-y-6"
          >
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="file-upload-helper-text" value="Video Title" />
              </div>
              <TextInput
                value={meta.title}
                onChange={formFieldsChange}
                name="title"
                placeholder="Enter Title"
              />
            </div>
            {/* video description */}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea
                value={meta.description}
                onChange={formFieldsChange}
                name="description"
                id="comment"
                placeholder="write video description..."
                required
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-5 justify-center">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover rounded"
                  src={vidoeLogo}
                  alt="Current profile photo"
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose video file</span>
                <input
                 
                  name="file"
                  onChange={handleChange}
                  type="file"
                  className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
                />
              </label>
            </div>

            <div className="">
              {uploadedFile && (
                <Progress
                  color="green"
                  progress={progress}
                  textLabel="Uploading..."
                  size={"lg"}
                  labelProgress
                  labelText
                />
              )}
            </div>

            {/* message alert */}
            <div>
              {message && (
                <Alert
                  color="success"
                  rounded
                  withBorderAccent
                  onDismiss={() => {
                    setMessage("");
                  }}
                >
                  <span className="font-medium">Success alert! </span>
                  {message}
                </Alert>
              )}
            </div>

            <div className="flex justify-center">
              <Button disabled={uploadedFile} type="submit">
                Upload
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
