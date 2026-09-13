import { Order } from "@/lib/types";
import { GemArt, type GemVariant } from "@/components/ui/gem-art";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const statusTone = {
  processing: "sand",
  shipped: "lavender",
  delivered: "sage",
} as const;

export function OrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-plum/20 p-8 text-center">
        <p className="text-sm text-plum-soft">You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-2xl border border-plum/10 bg-ivory p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-serif-display text-lg text-plum-900">{order.id}</p>
              <p className="text-xs text-plum-soft">
                {new Date(order.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
            <Badge tone={statusTone[order.status]} className="capitalize">
              {order.status}
            </Badge>
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-plum/10 pt-4">
            {order.items.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-cream to-sand/40">
                  <GemArt variant={item.image as GemVariant} className="h-full w-full p-1.5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-plum-900">{item.name}</p>
                  <p className="text-xs text-plum-soft">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-plum-900">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-plum/10 pt-4">
            <span className="text-sm font-semibold text-plum-900">Total</span>
            <span className="font-serif-display text-lg text-plum-900">{formatPrice(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
