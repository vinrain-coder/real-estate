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
            className="w-full"
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full"
          >
            <option value="category">Select a category</option>
            <option value="rental">Rentals</option>
            <option value="for-sale">For sale</option>
          </Select>
          <Select
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full"
          >
            <option value="type">Type</option>
            <option value="bedsitter">Bedsitter</option>
            <option value="one-bedroom">One Bedroom</option>
            <option value="two-bedroom">Two Bedroom</option>
          </Select>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Select
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="w-full"
          >
            <option value="country">Select a country</option>
            <option value="kenya">Kenya</option>
          </Select>
          <Select
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full"
          >
            <option value="city">Select a city</option>
            <option value="Nairobi">Nairobi</option>
            <option value="mombasa">Mombasa</option>
            <option value="kisumu">Kisumu</option>
            <option value="nakuru">Nakuru</option>
            <option value="eldoret">Eldoret</option>
          </Select>
          <Select
            onChange={(e) =>
              setFormData({ ...formData, estate: e.target.value })
            }
            className="w-full"
          >
            <option value="estate">Estate</option>
            <option value="kahawa">Kahawa</option>
            <option value="kasarani">Kasarani</option>
            <option value="umoja">Umoja</option>
          </Select>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Select
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full"
          >
            <option value="status">Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="sold">Sold</option>
          </Select>
          <TextInput
            type="number"
            placeholder="Price"
            required
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full"
          />
        </div>
        {/* Image Upload Section */}
        <div className="flex items-center justify-between border-4 border-orange-400 border-dotted p-3">
          <FileInput onChange={(e) => setFile(e.target.files[0])} required/>
          <Button
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
            outline
            className="bg-orange-500"
          >
            {imageUploadProgress ? (
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
                className="h-12 w-12"
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
          required
          onChange={(value) => setFormData({ ...formData, description: value })}
          className="h-48 mb-12"
        />
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          outline
          className="bg-orange-500"
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
