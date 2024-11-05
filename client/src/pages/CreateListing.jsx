import { Select, TextInput, FileInput, Button, Alert } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState({});
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImages = async () => {
    const storage = getStorage(app);
    const uploadPromises = files.map((file) => {
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress((prev) => ({ ...prev, [file.name]: progress.toFixed(0) }));
          },
          (error) => {
            setImageUploadError("Image upload failed");
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      setFormData({ ...formData, images: downloadURLs });
      setImageUploadError(null);
    } catch (error) {
      setImageUploadError("Some images failed to upload");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/listing/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Listing</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextInput
            type="number"
            placeholder="Price"
            required
            id="price"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="uncategorized">Select a category</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
          </Select>
        </div>

        <FileInput
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
        <Button
          type="button"
          outline
          gradientDuoTone="purpleToPink"
          onClick={handleUploadImages}
          disabled={Object.keys(imageUploadProgress).length > 0}
        >
          {Object.keys(imageUploadProgress).length > 0 ? (
            <div className="w-16 h-16">
              <CircularProgressbar
                value={Object.values(imageUploadProgress).reduce((a, b) => a + b, 0) / Object.values(imageUploadProgress).length}
                text={`${(Object.values(imageUploadProgress).reduce((a, b) => a + b, 0) / Object.values(imageUploadProgress).length) || 0}%`}
              />
            </div>
          ) : (
            "Upload images"
          )}
        </Button>

        {imageUploadError && (
          <Alert className="bg-red-400">{imageUploadError}</Alert>
        )}
        {formData.images && formData.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Upload"
            className="w-full h-72 object-cover"
          />
        ))}

        <ReactQuill
          theme="snow"
          placeholder="Write a description..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, description: value })}
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
        >
          Publish
        </Button>
        {publishError && (
          <Alert color="failure">{publishError}</Alert>
        )}
      </form>
    </div>
  );
}
