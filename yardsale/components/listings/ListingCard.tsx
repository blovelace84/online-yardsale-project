import Image from "next/image";

type Listing = {
  id: string;
  title: string;
  price: number;
  images: string[] | null;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  console.log("LISTING DATA:", listing);
  const image = listing.images?.[0];

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      {image ? (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={listing.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-600">${listing.price}</p>
      </div>
    </div>
  );
}
