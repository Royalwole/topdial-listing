import Link from 'next/link';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[400px]">
      <Link href={`/listing/${listing._id}`}>
        {/* Image with Property Type Badge */}
        <div className="relative">
          <img
            src={
              listing.imageUrls[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt="listing cover"
            className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div
            className={`absolute top-2 left-2 ${
              listing.type === 'rent' ? 'bg-green-500' : 'bg-blue-500'
            } text-white px-2 py-1 rounded text-sm`}
          >
            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-gray-800 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-800 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <div className="text-xl font-bold text-blue-700 mt-2">
            {listing.offer ? (
              <>
                <span className="line-through text-gray-500 mr-2">
                  ${listing.regularPrice.toLocaleString('en-US')}
                </span>
                <span>${listing.discountPrice.toLocaleString('en-US')}</span>
              </>
            ) : (
              <span>${listing.regularPrice.toLocaleString('en-US')}</span>
            )}
            {listing.type === 'rent' && ' / month'}
          </div>
          <div className="text-slate-700 flex gap-4 mt-2">
            <div className="font-bold text-sm">
              {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
            </div>
            <div className="font-bold text-sm">
              {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}