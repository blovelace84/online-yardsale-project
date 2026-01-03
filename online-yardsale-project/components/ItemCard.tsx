import { Item } from "@/types/item";

type Props = {
  item: Item;
};

export function ItemCard({ item }: Props) {
  return (
    <div className="rounded-xl border p-4 hover:shadow-md transition">
      <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
      <h2 className="font-semibold text-lg">{item.title}</h2>
      <p className="text-gray-600">${item.price}</p>
      <p className="text-sm text-gray-500">Contact Seller</p>
    </div>
  );
}
