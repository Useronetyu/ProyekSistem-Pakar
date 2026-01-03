import { Card } from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
  delay?: string;
}

const StatCard = ({ value, label, delay = "0s" }: StatCardProps) => {
  return (
    <Card
      variant="ornament"
      className="p-6 text-center opacity-0 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </Card>
  );
};

export default StatCard;
