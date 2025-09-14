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
import { formatBatchQuantity } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BatchesTableProps {
  product: Product;
}

const BatchesTable = ({ product }: BatchesTableProps) => {
  const { addToCart } = useCart();
  const isMobile = useIsMobile();

  const handleAddToCart = (batch: Batch) => {
    addToCart(product, batch);
  };

  const sortedBatches = [...product.batches].sort(
    (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  );

  if (isMobile) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Batches</h2>
        <div className="space-y-4">
          {sortedBatches.map((batch) => {
            const daysLeft = differenceInDays(
              new Date(batch.expiryDate),
              new Date()
            );

            return (
              <Card
                key={batch.id}
                className="transition-colors hover:border-primary hover:bg-muted/40"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-semibold">{formatBatchQuantity(product, batch)} available</p>
                      <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {daysLeft} days left
                      </Badge>
                    </div>
                    <Button onClick={() => handleAddToCart(batch)} className="flex-shrink-0">
                      Add to Cart
                    </Button>
                  </div>
                  <Separator />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <span className="font-medium text-foreground/80">Production:</span>{" "}
                      {format(new Date(batch.productionDate), "MMM d, yyyy")}
                    </p>
                    <p>
                      <span className="font-medium text-foreground/80">Best Before:</span>{" "}
                      {format(new Date(batch.expiryDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Available Batches</h2>
      <div className="border rounded-lg overflow-x-auto bg-card">
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

              return (
                <TableRow
                  key={batch.id}
                  className="border-b border-secondary last:border-b-0 transition-colors hover:bg-muted/40"
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