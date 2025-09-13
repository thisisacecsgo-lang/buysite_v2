import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Batch, Product } from "@/types";
import { format, differenceInDays } from "date-fns";
import { useCart } from "@/context/CartContext";
import { cn, formatBatchQuantity } from "@/lib/utils";

interface BatchesTableProps {
  product: Product;
}

const BatchesTable = ({ product }: BatchesTableProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (batch: Batch) => {
    addToCart(product, batch);
  };

  const sortedBatches = [...product.batches].sort(
    (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  );

  const soonestToExpireBatchId =
    sortedBatches.length > 0 ? sortedBatches[0].id : null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Available Batches</h2>
      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-secondary hover:bg-transparent">
              <TableHead className="text-foreground/80 font-semibold">Production Date</TableHead>
              <TableHead className="text-foreground/80 font-semibold">Best Before</TableHead>
              <TableHead className="text-foreground/80 font-semibold">Days Left</TableHead>
              <TableHead className="text-foreground/80 font-semibold">Available</TableHead>
              <TableHead className="text-right text-foreground/80 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBatches.map((batch) => {
              const daysLeft = differenceInDays(
                new Date(batch.expiryDate),
                new Date()
              );
              const isSoonestToExpire = batch.id === soonestToExpireBatchId;

              return (
                <TableRow
                  key={batch.id}
                  className={cn(
                    "border-b border-secondary last:border-b-0",
                    isSoonestToExpire && "bg-muted/40"
                  )}
                >
                  <TableCell className="py-4">
                    {format(new Date(batch.productionDate), "MMMM do, yyyy")}
                  </TableCell>
                  <TableCell className="py-4">
                    {format(new Date(batch.expiryDate), "MMMM do, yyyy")}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      {daysLeft} days
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">{formatBatchQuantity(product, batch)}</TableCell>
                  <TableCell className="text-right py-2">
                    <Button onClick={() => handleAddToCart(batch)}>
                      Add to Cart
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BatchesTable;