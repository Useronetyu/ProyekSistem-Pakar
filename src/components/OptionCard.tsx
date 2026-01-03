import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface OptionCardProps {
  code: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const OptionCard = ({ code, label, selected, onClick }: OptionCardProps) => {
  return (
    <Card
      variant="selection"
      className={`p-4 ${
        selected
          ? "border-primary bg-primary/5 shadow-gold"
          : "border-border hover:border-primary/50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            selected
              ? "border-primary bg-primary"
              : "border-muted-foreground/30"
          }`}
        >
          {selected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
        </div>
        <div className="flex-1">
          <span className="text-xs font-mono text-muted-foreground">{code}</span>
          <p className="text-sm font-medium text-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
};

export default OptionCard;
