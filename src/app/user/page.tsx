import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "User Profile | Finance Dashboard",
  description: "View and manage your profile",
};

export default function UserPage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2023",
    avatar: "/user-avatar.jpg",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <div className="p-2 border rounded-md">
                    {user.name}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <div className="p-2 border rounded-md">
                    {user.email}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Member Since
                  </label>
                  <div className="p-2 border rounded-md">
                    {user.joinDate}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full sm:w-auto">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
