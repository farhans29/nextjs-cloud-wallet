import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About | Finance Dashboard",
  description: "Learn more about our finance tracking application",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>About Finance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Welcome to Finance Dashboard, your personal finance tracking solution.
              Our application helps you manage your income, expenses, and savings
              all in one place.
            </p>
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Track your income and expenses</li>
              <li>View spending by category</li>
              <li>Monitor your savings progress</li>
              <li>Generate financial reports</li>
              <li>Set and track financial goals</li>
            </ul>
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p>
              We believe that everyone should have access to powerful financial
              tools to help them make better decisions about their money. Our
              mission is to make personal finance management simple, intuitive,
              and accessible to everyone.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
