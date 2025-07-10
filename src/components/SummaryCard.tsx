import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  valueClassName?: string;
};

export function SummaryCard({ 
  title, 
  value, 
  subtitle, 
  icon,
  valueClassName = "" 
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueClassName}`}>
          {typeof value === 'number' && '$'}
          {value}
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
