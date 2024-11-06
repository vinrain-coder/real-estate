import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
    type: "all",
    status: "all",
  });

  console.log(sidebarData);
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
    if (
      searchTermFromUrl ||
      sortFromUrl ||
      categoryFromUrl ||
      typeFromUrl ||
      statusFromUrl
    ) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
        type: typeFromUrl,
        status: statusFromUrl,
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings);
        setLoading(false);
        if (data.listings.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
    if (e.target.id === "type") {
      const type = e.target.value || "all";
      setSidebarData({ ...sidebarData, type });
    }
    if (e.target.id === "status") {
      const status = e.target.value || "all";
      setSidebarData({ ...sidebarData, status });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
  
    // Only add parameters that are not the default values or null/empty
    if (sidebarData.searchTerm) urlParams.set('searchTerm', sidebarData.searchTerm);
    if (sidebarData.sort && sidebarData.sort !== 'desc') urlParams.set('sort', sidebarData.sort);
    if (sidebarData.category && sidebarData.category !== 'uncategorized') urlParams.set('category', sidebarData.category);
    if (sidebarData.type && sidebarData.type !== 'all') urlParams.set('type', sidebarData.type);
    if (sidebarData.status && sidebarData.status !== 'all') urlParams.set('status', sidebarData.status);
  
    // Construct the search query string
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  

  const handleShowMore = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams();
  
    // Only add parameters that are not the default values or null/empty
    if (sidebarData.searchTerm) urlParams.set('searchTerm', sidebarData.searchTerm);
    if (sidebarData.sort && sidebarData.sort !== 'desc') urlParams.set('sort', sidebarData.sort);
    if (sidebarData.category && sidebarData.category !== 'uncategorized') urlParams.set('category', sidebarData.category);
    if (sidebarData.type && sidebarData.type !== 'all') urlParams.set('type', sidebarData.type);
    if (sidebarData.status && sidebarData.status !== 'all') urlParams.set('status', sidebarData.status);
  
    // Add start index to load more listings
    urlParams.set('startIndex', startIndex);
  
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setListings([...listings, ...data.listings]);
      if (data.listings.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="rental">Rental</option>
              <option value="sale">For sale</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Type:</label>
            <Select onChange={handleChange} value={sidebarData.type} id="type">
              <option value="all">All</option>
              <option value="bedsitter">Beditter</option>
              <option value="one-bedroom">One Bedroom</option>
              <option value="two-bedroom">Two Bedroom</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Status:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.status}
              id="status"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
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
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
