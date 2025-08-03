import { Card } from "@/components/ui/card";
import { ValueCardProps } from "../types";

export function ValueCard({ value, index }: ValueCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <value.icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{value.title}</h3>
        <p className="text-gray-400 text-sm">{value.description}</p>
      </div>
    </Card>
  );
}