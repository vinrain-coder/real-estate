import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { logoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-md text-2xl md:text-4xl font-bold text-orange-500"
      >
        FindHouse
      </Link>

      {/* Large screen search */}
      <form onSubmit={handleSubmit} className="hidden sm:flex">
        <div className="relative flex items-center justify-end">
          <TextInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-4">
            <AiOutlineSearch className="text-lg" />
          </button>
        </div>
      </form>

      {/* Small screen search */}
      <form onSubmit={handleSubmit} className="sm:hidden flex">
        <div className="relative flex items-center justify-end">
          <Button
            className="w-10 h-10 rounded-full"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-3 dark:text-gray-700">
            <AiOutlineSearch className="text-lg" />
          </button>
        </div>
      </form>

      <div className="flex gap-2 md:order-2">
        {/* Dark/Light mode toggle */}
        <Button
          className="w-12 h-10"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm z-10">
                @{currentUser.username}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* Conditionally show dashboard and add listing options if user is an admin */}
            {currentUser.isAdmin && (
              <>
                <Link to="/dashboard">
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
                <Link to="/create-listing">
                  <Dropdown.Item>Add Listing</Dropdown.Item>
                </Link>
              </>
            )}

            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button outline className="bg-orange-500">
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link as="div">
          <Link to="#get-started">Get started</Link>
        </Navbar.Link>
        <Navbar.Link as="div">
          <Link to="#value">Our value</Link>
        </Navbar.Link>
        <Navbar.Link as="div">
          <Link to="#contact-us">Contact us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
