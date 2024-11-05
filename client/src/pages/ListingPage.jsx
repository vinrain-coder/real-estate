import { Spinner, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; 
import "leaflet/dist/leaflet.css"; 
import ListingCard from "../components/ListingCard"; // Import your ListingCard component if needed

export default function ListingPage() {
  const { listingSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const [recentListings, setRecentListings] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getlistings?slug=${listingSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data.listings[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingSlug]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      const res = await fetch(`/api/listing/getlistings?limit=3`);
      const data = await res.json();
      if (res.ok) {
        setRecentListings(data.listings);
      }
    };
    fetchRecentListings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Error loading the listing. Please try again later.</p>
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-3-2xl mx-auto lg:text-4xl">
        {listing && listing.title}
      </h1>
      {listing && (
        <Link
          to={`/search?category=${listing.category}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="xs">
            {listing.category}
          </Button>
        </Link>
      )}
      {listing && (
        <img
          src={listing.image}
          alt={listing.title}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
      )}
      {listing && (
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
          <span className="italic">{listing.price} Ksh</span>
        </div>
      )}
      {listing && (
        <div className="p-3 max-w-2xl mx-auto w-full">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-2">{listing.description}</p>
        </div>
      )}
      {listing && (
        <div className="p-3 max-w-2xl mx-auto w-full">
          <h2 className="text-xl font-semibold">Location</h2>
          <MapContainer center={[listing.latitude, listing.longitude]} zoom={13} className="h-60 w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[listing.latitude, listing.longitude]}>
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      {listing && <CommentSection listingId={listing._id} />}
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Listings</h1>
        <div className="flex gap-5 flex-wrap justify-center">
          {recentListings &&
            recentListings.map((recentListing) => (
              <ListingCard key={recentListing._id} listing={recentListing} />
            ))}
        </div>
      </div>
    </main>
  );
}
