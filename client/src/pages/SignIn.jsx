import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the fields"));
    }

    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message || "Sign-in failed"));
      }
    } catch (error) {
      dispatch(signInFailure("An error occurred. Please try again."));
    }
  };

  return (
    <div className="min-h-screen mt-20 px-4">
      <div className="flex flex-col sm:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5">
        <div className="flex-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-md text-2xl md:text-4xl font-bold text-orange-500"
          >
            FindHouse
          </Link>
          <p className="text-sm mt-5">
            Welcome to FindHouse. You can sign in with your email and password.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              outline
              className="bg-orange-500"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="rounded-md mt-5 bg-rose-500 font-semibold">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
