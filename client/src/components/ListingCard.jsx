import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <div className="group relative max-w-[310px] w-full border border-orange-300 hover:border-2 h-[400px] overflow-hidden rounded-lg transition-all m-4">
      <Link to={`/listing/${listing.slug}`}>
        <img
          src={listing.image}
          alt="listing cover"
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
          <p className="text-lg font-semibold font-lora line-clamp-1">
            {listing &&
              listing.title &&
              listing.title.charAt(0).toUpperCase() + listing.title.slice(1)}
          </p>
        <div className="flex justify-between mt-2">
          <h1 className="font-semibold">
            {listing &&
              listing.type &&
              listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
          </h1>
          <div className="flex">
            <h1 className=" flex flex-row text-orange-500 font-bold text-md">
              Price: Kshs.
            </h1>
            <h1 className="font-bold text-orange-500 text-md">
              {listing && listing.price && listing.price.toLocaleString()}
            </h1>
          </div>
        </div>
        <span className="italic text-md mt-2 animate-pulse">
            {listing &&
              listing.category &&
              listing.category.charAt(0).toUpperCase() +
                listing.category.slice(1)}
          </span>
        <Link
          to={`/listing/${listing.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          View listing
        </Link>
      </div>
    </div>
  );
}
