import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ResponsiveTooltip } from "./ResponsiveTooltip";

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
    <ResponsiveTooltip content={<p>Copy SKU</p>}>
      <Badge
        variant="secondary"
        className={cn(
          "cursor-pointer font-mono",
          className
        )}
        onClick={handleCopy}
      >
        # {textToCopy}
      </Badge>
    </ResponsiveTooltip>
  );
};

export default CopyableBadge;