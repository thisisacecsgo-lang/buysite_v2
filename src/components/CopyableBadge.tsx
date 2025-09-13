import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyableBadgeProps {
  textToCopy: string;
  className?: string;
}

const CopyableBadge = ({ textToCopy, className }: CopyableBadgeProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    toast.success(`Copied SKU #${textToCopy} to clipboard!`);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="secondary"
            className={cn(
              "cursor-pointer font-mono text-sm py-1.5 px-4 text-secondary-foreground hover:bg-secondary/80",
              className
            )}
            onClick={handleCopy}
          >
            # {textToCopy}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy SKU</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyableBadge;