"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { Pencil, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, generateSubscriptions } from "@/lib/data-utils";

const subscriptions = generateSubscriptions(12);

export default function SubscriptionsPage() {
  const router = useRouter();

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <Badge variant="outline">{type}</Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return formatCurrency(price);
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            className={
              status === "Active"
                ? "bg-green-500 hover:bg-green-600"
                : status === "Inactive"
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const subscription = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/crm/subscriptions/edit/${subscription.id}`)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage subscription plans and pricing
          </p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add Subscription</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>
            View and manage all subscription plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={subscriptions} searchKey="name" searchPlaceholder="Search subscriptions..." />
        </CardContent>
      </Card>
    </div>
  );
}