import { Spinner, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import ListingCard from "../components/ListingCard";
import { AiOutlineArrowRight } from "react-icons/ai";

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
        if (res.ok) {
          setListing(data.listings[0]); // Ensure we're getting the first item
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingSlug]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/getlistings?category=${listing?.category}`
        );
        const data = await res.json();
        if (res.ok) {
          setRecentListings(data.listings);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (listing) {
      fetchRecentListings();
    }
  }, [listing]);

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
      <h1 className="text-3xl mt-10 p-3 text-center font-lora max-3-2xl mx-auto lg:text-4xl font-semibold text-orange-400">
        {listing && listing.title}
      </h1>
      {listing && (
        <Link
          to={`/search?category=${listing.category}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="lg">
            {listing &&
              listing.category &&
              listing.category.charAt(0).toUpperCase() +
                listing.category.slice(1)}
          </Button>
        </Link>
      )}
      {listing && (
        <img
          src={listing.image}
          alt={listing.title}
          className="mt-10 h-56 md:h-96 object-cover w-full rounded-lg border-2 self-center border-orange-300 max-w-4xl"
        />
      )}

      <div className="flex flex-row gap-4 items-center justify-center m-10">
        <h1 className="font-bold text-xl">Location:</h1>
        <h1 className="font-semibold">
          {listing &&
            listing.country &&
            listing.country.charAt(0).toUpperCase() + listing.country.slice(1)}
        </h1>
        <AiOutlineArrowRight />

        <h1 className="font-semibold">
          {listing &&
            listing.city &&
            listing.city.charAt(0).toUpperCase() + listing.city.slice(1)}
        </h1>
        <AiOutlineArrowRight />

        <h1 className="font-semibold">
          {listing &&
            listing.estate &&
            listing.estate.charAt(0).toUpperCase() + listing.estate.slice(1)}
        </h1>
      </div>
      <div className="flex flex-row gap-12 items-center justify-center">
        <div className=" flex flex-row gap-2">
          <h1 className="font-semibold">Status:</h1>
          <h1 className="font-semibold">
            {listing &&
              listing.status &&
              listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </h1>
        </div>
        <div className="flex flex-row gap-1 items-center justify-center">
          <h1 className=" flex flex-row text-orange-500 font-bold text-lg">
            Price: Kshs.
          </h1>
          <h1 className="font-bold text-orange-500 text-lg">
            {listing && listing.price && listing.price.toLocaleString()}
          </h1>
        </div>
      </div>
      {listing && (
        <div
          className="p-3 m-10 max-w-2xl mx-auto w-full listing-content"
          dangerouslySetInnerHTML={{ __html: listing.description }}
        ></div>
      )}
      <div className="max-w-4xl mx-auto w-full"></div>
      {listing && <CommentSection listingId={listing._id} />}
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
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
