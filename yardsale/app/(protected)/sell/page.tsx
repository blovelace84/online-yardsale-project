import CreateListingForm from "@/components/listings/CreateListingForm";
export default function SellPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold text-gray-900">Create a Listing</h1>

      <p className="mt-1 text-sm text-gray-700">
        Fill out the details below to sell your item.
      </p>

      <div className="mt-6">
        <CreateListingForm />
      </div>
    </main>
  );
}
