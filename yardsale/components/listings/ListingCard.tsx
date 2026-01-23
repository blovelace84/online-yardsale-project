import Image from "next/image";

type Listing = {
  id: string;
  title: string;
  price: number;
  images: string[] | null;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const imageUrl =
    listing.images && listing.images.length > 0 ? listing.images[0] : null;

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">
        <h3 className="truncate font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-600">${listing.price}</p>
      </div>
    </div>
  );
}
