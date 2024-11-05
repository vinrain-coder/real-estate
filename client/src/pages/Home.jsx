import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard"; 
import Hero from "../components/Hero";
import Companies from "../components/Companies";
import Value from "../components/Value";
import Contact from "../components/Contact";
import GetStarted from "../components/GetStarted";

export default function Home() {
  const [listings, setListings] = useState([]); // Updated state variable name

  useEffect(() => {
    const fetchListings = async () => {
      const res = await fetch("/api/listing/getlistings"); 
      const data = await res.json();
      setListings(data.listings); 
    };
    fetchListings();
  }, []);

  return (
    <div>
      <Hero />
      <Companies />
      <Value />
      <Contact />
      <GetStarted />
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {listings && listings.length > 0 && ( 
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Listings</h2>
            <div className="flex flex-wrap gap-4">
              {listings.map((listing) => ( // Map through listings
                <ListingCard key={listing._id} listing={listing} /> // Changed to ListingCard
              ))}
            </div>
            <Link
              to={"/search"} 
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all listings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
