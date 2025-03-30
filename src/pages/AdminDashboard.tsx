
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, Home, Hotel, User, Users } from "lucide-react";

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  host: string;
  status: "approved" | "pending" | "rejected";
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "user" | "host" | "admin";
  status: "active" | "inactive";
  joined: string;
}

const AdminDashboard = () => {
  // Mock data for demo purposes
  const [properties, setProperties] = useState<Property[]>([
    { id: "1", name: "Seaside Villa", type: "house", location: "Miami, FL", host: "John Doe", status: "approved" },
    { id: "2", name: "Mountain Retreat", type: "apartment", location: "Denver, CO", host: "Jane Smith", status: "pending" },
    { id: "3", name: "Downtown Loft", type: "apartment", location: "New York, NY", host: "Mike Johnson", status: "rejected" },
    { id: "4", name: "Lakeside Cabin", type: "house", location: "Lake Tahoe, CA", host: "Sarah Williams", status: "pending" },
  ]);

  const [users, setUsers] = useState<UserData[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "host", status: "active", joined: "2023-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", joined: "2023-02-20" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "host", status: "inactive", joined: "2023-03-10" },
    { id: "4", name: "Sarah Williams", email: "sarah@example.com", role: "admin", status: "active", joined: "2023-01-05" },
  ]);

  const approveProperty = (id: string) => {
    setProperties(
      properties.map((property) =>
        property.id === id ? { ...property, status: "approved" } : property
      )
    );
  };

  const rejectProperty = (id: string) => {
    setProperties(
      properties.map((property) =>
        property.id === id ? { ...property, status: "rejected" } : property
      )
    );
  };

  const changeUserRole = (id: string, newRole: "user" | "host" | "admin") => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-chillspace-sand py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-chillspace-navy">Admin Dashboard</h1>
            <p className="text-gray-600">Manage properties, users, and system settings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{properties.length}</div>
                <p className="text-xs text-muted-foreground">
                  {properties.filter(p => p.status === "pending").length} pending approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  {users.filter(u => u.role === "host").length} hosts, {users.filter(u => u.role === "user").length} guests
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.filter(u => u.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">
                  {((users.filter(u => u.status === "active").length / users.length) * 100).toFixed(0)}% of total users
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="properties" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <Card>
                <CardHeader>
                  <CardTitle>Property Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Property Name</th>
                          <th className="text-left p-3">Type</th>
                          <th className="text-left p-3">Location</th>
                          <th className="text-left p-3">Host</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((property) => (
                          <tr key={property.id} className="border-b">
                            <td className="p-3">{property.name}</td>
                            <td className="p-3">
                              <div className="flex items-center">
                                {property.type === "house" && <Home className="h-4 w-4 mr-1" />}
                                {property.type === "apartment" && <Building className="h-4 w-4 mr-1" />}
                                {property.type === "hotel" && <Hotel className="h-4 w-4 mr-1" />}
                                {property.type}
                              </div>
                            </td>
                            <td className="p-3">{property.location}</td>
                            <td className="p-3">{property.host}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                property.status === "approved" 
                                  ? "bg-green-100 text-green-800" 
                                  : property.status === "pending" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {property.status}
                              </span>
                            </td>
                            <td className="p-3">
                              {property.status === "pending" && (
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => approveProperty(property.id)}
                                    className="bg-green-500 hover:bg-green-600"
                                  >
                                    Approve
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => rejectProperty(property.id)}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {property.status !== "pending" && (
                                <Button size="sm" variant="outline">View Details</Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Name</th>
                          <th className="text-left p-3">Email</th>
                          <th className="text-left p-3">Role</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Joined</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">
                              <select 
                                className="border rounded px-2 py-1"
                                value={user.role}
                                onChange={(e) => changeUserRole(user.id, e.target.value as "user" | "host" | "admin")}
                              >
                                <option value="user">User</option>
                                <option value="host">Host</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === "active" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="p-3">{user.joined}</td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant={user.status === "active" ? "destructive" : "default"}
                                  onClick={() => toggleUserStatus(user.id)}
                                >
                                  {user.status === "active" ? "Deactivate" : "Activate"}
                                </Button>
                                <Button size="sm" variant="outline">View</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
