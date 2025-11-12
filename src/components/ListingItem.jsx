import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
dayjs.extend(relativeTime);

const formatNumber = (value) => {
  if (value === null || value === undefined) {
    return "N/A";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return numericValue.toLocaleString();
};

const formatWithUnit = (value, unit) => {
  const formatted = formatNumber(value);
  if (formatted === "N/A") {
    return formatted;
  }

  return `${formatted} ${unit}`;
};

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
        />
        {listing.timestamp && (
          <span className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
            {dayjs(listing.timestamp.toDate()).fromNow()}
          </span>
        )}
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / day"}
          </p>
          <div className="mt-[10px] grid w-full grid-cols-2 gap-3 text-xs text-gray-700 sm:grid-cols-3">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide text-gray-500">
                Brand
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {listing.brand || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide text-gray-500">
                Model
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {listing.model || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide text-gray-500">
                Year
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {listing.year || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wide text-gray-500">
                Mileage
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {formatWithUnit(listing.mileage, "km")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wide text-gray-500">
                Displacement
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {formatWithUnit(listing.engineCapacity, "cc")}
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.hasWarranty && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold uppercase text-green-700">
                Warranty included
              </span>
            )}
            {listing.includesAccessories && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold uppercase text-blue-700">
                Accessories included
              </span>
            )}
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
}