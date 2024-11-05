import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard'; // Ensure this component can display prices

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    propertyType: 'all',
    location: '',
    minPrice: '', // New field for minimum price
    maxPrice: '', // New field for maximum price
  });

  console.log(sidebarData);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const propertyTypeFromUrl = urlParams.get('propertyType');
    const locationFromUrl = urlParams.get('location');
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');

    setSidebarData({
      searchTerm: searchTermFromUrl || '',
      sort: sortFromUrl || 'desc',
      propertyType: propertyTypeFromUrl || 'all',
      location: locationFromUrl || '',
      minPrice: minPriceFromUrl || '', // Set minPrice from URL
      maxPrice: maxPriceFromUrl || '', // Set maxPrice from URL
    });

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setListings(data.listings);
      setLoading(false);
      setShowMore(data.listings.length === 9);
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData({ ...sidebarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('propertyType', sidebarData.propertyType);
    urlParams.set('location', sidebarData.location);
    urlParams.set('minPrice', sidebarData.minPrice); // Add minPrice to URL
    urlParams.set('maxPrice', sidebarData.maxPrice); // Add maxPrice to URL
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const numberOfListings = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', numberOfListings);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setListings([...listings, ...data.listings]);
    setShowMore(data.listings.length === 9);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <TextInput
              placeholder='Search properties...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Newest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Property Type:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.propertyType}
              id='propertyType'
            >
              <option value='all'>All Types</option>
              <option value='apartment'>Apartment</option>
              <option value='house'>House</option>
              <option value='land'>Land</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Location:</label>
            <TextInput
              placeholder='Enter location...'
              id='location'
              type='text'
              value={sidebarData.location}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Min Price:</label>
            <TextInput
              placeholder='Min Price'
              id='minPrice'
              type='number'
              value={sidebarData.minPrice}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Max Price:</label>
            <TextInput
              placeholder='Max Price'
              id='maxPrice'
              type='number'
              value={sidebarData.maxPrice}
              onChange={handleChange}
            />
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
          Property Results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-gray-500'>No properties found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading && listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} /> // Changed to ListingCard
          ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
