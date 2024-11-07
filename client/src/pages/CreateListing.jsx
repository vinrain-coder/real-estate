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
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      navigate(`/listing/${data.slug}`);
    } catch (error) {
      setLoading(false);
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a listing
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="category">Select a category</option>
            <option value="rental">Rentals</option>
            <option value="for-sale">For sale</option>
          </Select>
          <Select
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="type">Type</option>
            <option value="bedsitter">Bedsitter</option>
            <option value="one-bedroom">One Bedroom</option>
          </Select>
        </div>
        {/* Image Upload Section */}
        <div className="flex items-center border-4 border-teal-500 border-dotted p-3">
          <FileInput onChange={(e) => setFile(e.target.files[0])} />
          <Button onClick={handleUploadImage} disabled={imageUploadProgress}>
            {imageUploadProgress ? (
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
              />
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt="Preview" className="w-24 h-24" />
        )}
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, description: value })}
        />
        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
