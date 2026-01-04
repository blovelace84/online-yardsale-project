import Image from "next/image";
import { Item } from "@/types/item";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="rounded-xl border p-4">
      {item.image_url && (
        <div className="relative aspect-square mb-3">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <h2 className="font-semibold">{item.title}</h2>
      <p className="text-gray-600">${item.price}</p>
    </div>
  );
}
