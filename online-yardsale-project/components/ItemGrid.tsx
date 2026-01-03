import { ItemCard } from "@/components/ItemCard";
import { Item } from "@/types/item";

type Props = {
  items: Item[];
};

export function ItemGrid({ items }: Props) {
  if (!items?.length) {
    return <p className="text-gray-500"> No items for sale yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
