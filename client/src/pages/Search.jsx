import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Import the remove icon
import ListingCard from "../components/ListingCard";

export default function Search() {
  const defaultSidebarData = {
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
    type: "all",
    status: "all",
    estate: "all",
  };

  const [sidebarData, setSidebarData] = useState(defaultSidebarData);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    const typeFromUrl = urlParams.get("type");
    const statusFromUrl = urlParams.get("status");
    const estateFromUrl = urlParams.get("estate");
    
    setSidebarData({
      ...sidebarData,
      searchTerm: searchTermFromUrl || "",
      sort: sortFromUrl || "desc",
      category: categoryFromUrl || "uncategorized",
      type: typeFromUrl || "all",
      status: statusFromUrl || "all",
      estate: estateFromUrl || "all",
    });

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
      setLoading(false);
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings);
        setShowMore(data.listings.length === 9);
      }
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
  };

  const handleRemoveFilter = (filterKey) => {
    setSidebarData({ ...sidebarData, [filterKey]: defaultSidebarData[filterKey] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    
    Object.keys(sidebarData).forEach((key) => {
      if (sidebarData[key] !== defaultSidebarData[key]) {
        urlParams.set(key, sidebarData[key]);
      }
    });

    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams();

    Object.keys(sidebarData).forEach((key) => {
      if (sidebarData[key] !== defaultSidebarData[key]) {
        urlParams.set(key, sidebarData[key]);
      }
    });
    urlParams.set("startIndex", startIndex);

    const res = await fetch(`/api/listing/getlistings?${urlParams.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setListings([...listings, ...data.listings]);
      setShowMore(data.listings.length === 9);
    }
  };

  const handleClearFilters = () => {
    setSidebarData(defaultSidebarData);
    navigate("/search");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
            {sidebarData.searchTerm && (
              <AiOutlineClose
                onClick={() => handleRemoveFilter("searchTerm")}
                className="cursor-pointer text-red-500"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
            {sidebarData.sort !== "desc" && (
              <AiOutlineClose
                onClick={() => handleRemoveFilter("sort")}
                className="cursor-pointer text-red-500"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select onChange={handleChange} value={sidebarData.category} id="category">
              <option value="uncategorized">Uncategorized</option>
              <option value="rental">Rental</option>
              <option value="sale">For sale</option>
            </Select>
            {sidebarData.category !== "uncategorized" && (
              <AiOutlineClose
                onClick={() => handleRemoveFilter("category")}
                className="cursor-pointer text-red-500"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Type:</label>
            <Select onChange={handleChange} value={sidebarData.type} id="type">
              <option value="all">All</option>
              <option value="bedsitter">Bedsitter</option>
              <option value="one-bedroom">One Bedroom</option>
              <option value="two-bedroom">Two Bedroom</option>
            </Select>
            {sidebarData.type !== "all" && (
              <AiOutlineClose
                onClick={() => handleRemoveFilter("type")}
                className="cursor-pointer text-red-500"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Status:</label>
            <Select onChange={handleChange} value={sidebarData.status} id="status">
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
            </Select>
            {sidebarData.status !== "all" && (
              <AiOutlineClose
                onClick={() => handleRemoveFilter("status")}
                className="cursor-pointer text-red-500"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Estate:</label>
            <Select onChange={handleChange} value={sidebarData.estate} id="estate">
              <option value="all">All</option>
              <option value="kahawa">Kahawa</option>
              <option value="kasarani">Kasarani</option>
              <option value="umoja">Umoja</option>
            </Select>
            {sidebarData.estate !== "all" && (
              <AiOutlineClose
                onClick={() => handleRemoveFilter("estate")}
                className="cursor-pointer text-red-500"
              />
            )}
          </div>
          <Button type="submit" outline className="bg-orange-500 font-bold">
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters} color="red" className="mt-2">
            Clear Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Listings results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-gray-500">No listings found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-orange-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
