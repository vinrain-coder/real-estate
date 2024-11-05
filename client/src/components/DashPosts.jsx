import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listingIdToDelete, setListingIdToDelete] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/getlistings?userId=${currentUser._id}&superadmin=${currentUser.isSuperadmin}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserListings(data.listings);
          if (data.listings.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchListings();
  }, [currentUser._id, currentUser.isSuperadmin]);

  const handleShowMore = async () => {
    const startIndex = userListings.length;
    try {
      const res = await fetch(
        `/api/listing/getlistings?userId=${currentUser._id}&startIndex=${startIndex}&superadmin=${currentUser.isSuperadmin}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserListings((prev) => [...prev, ...data.listings]);
        if (data.listings.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteListing = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/listing/deletelisting/${listingIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserListings((prev) =>
          prev.filter((listing) => listing._id !== listingIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {userListings.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Listing image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {userListings.map((listing) => (
              <Table.Body key={listing._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(listing.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/listing/${listing.slug}`}>
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/listing/${listing.slug}`}
                    >
                      {listing.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{listing.category}</Table.Cell>
                  <Table.Cell>
                    {(currentUser.isSuperadmin || listing.userId === currentUser._id) && (
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setListingIdToDelete(listing._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {(currentUser.isSuperadmin || listing.userId === currentUser._id) && (
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-listing/${listing._id}`}
                      >
                        Edit
                      </Link>
                    )}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>No listings available!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this listing?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteListing}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
