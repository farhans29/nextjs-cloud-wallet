import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CategorySpending } from "@/types/finance";

type SpendingByCategoryProps = {
  categories: CategorySpending[];
};

export function SpendingByCategory({ categories }: SpendingByCategoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-muted">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-sm font-medium">
                  ${category.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={category.percentage} className="h-2" />
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {category.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
