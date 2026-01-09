import Link from "next/link";

type Listing = {
  id: string;
  title: string;
  price: number;
  status: string;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
      <p className="mt-1 text-sm text-gray-700">${listing.price}</p>

      <span
        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium
                    listing.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
      >
        {listing.status}
      </span>
    </Link>
  );
}
