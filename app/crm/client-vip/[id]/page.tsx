"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Check, CreditCard, Clock, Star, CalendarDays, Mail, Phone, UserCheck, Truck, ShoppingBag, Settings, Gift, Users } from "lucide-react";
import { generateClients } from "@/lib/data-utils";
import { Progress } from "@/components/ui/progress";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Sample data
const clients = generateClients(25);

export default function ClientVIPPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  
  useEffect(() => {
    if (params.id) {
      const foundClient = clients.find((c) => c.id === params.id);
      if (foundClient) {
        setClient({
          ...foundClient,
          vipStatus: "Platinum",
          joinDate: new Date(2023, 5, 15).toISOString(),
          totalSpent: 15750.45,
          lastPurchase: new Date(2025, 3, 10).toISOString(),
          lifetime: {
            orders: 23,
            avgValue: 684.80,
            returns: 1,
            support: 3,
          },
          preferences: {
            categories: ["Electronics", "Home Office", "Audio"],
            paymentMethod: "Credit Card",
            shippingMethod: "Express",
            marketingOpt: true,
          },
          journey: {
            acquisition: {
              source: "Google Ads",
              campaign: "Summer Promotion 2023",
              date: new Date(2023, 5, 15).toISOString(),
              firstOrder: new Date(2023, 5, 16).toISOString(),
            },
            nurturing: {
              emailEngagement: 78,
              webVisits: 45,
              productViews: 120,
            },
            loyalty: {
              tier: "Platinum",
              points: 2450,
              benefits: ["Free Shipping", "Priority Support", "Early Access", "Birthday Gift"],
            },
            advocacy: {
              referrals: 5,
              reviews: 8,
              socialShares: 12,
            },
          }
        });
      }
    }
  }, [params.id]);
  
  if (!client) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="p-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/crm/clients">Clients</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/crm/clients/view/${client.id}`}>{client.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>VIP Journey</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{getInitials(client.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
                <Badge className="bg-purple-500">VIP</Badge>
              </div>
              <p className="text-muted-foreground">VIP Client Journey</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{client.vipStatus} Member</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Client since {new Date(client.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Client Journey Progress</h2>
          <p className="text-sm text-muted-foreground">Tracking the complete lifecycle</p>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="col-span-4 space-y-2 md:col-span-1">
            <div className="flex justify-between">
              <span className="text-sm">Acquisition</span>
              <span className="text-sm font-medium">100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div className="col-span-4 space-y-2 md:col-span-1">
            <div className="flex justify-between">
              <span className="text-sm">Nurturing</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="col-span-4 space-y-2 md:col-span-1">
            <div className="flex justify-between">
              <span className="text-sm">Loyalty</span>
              <span className="text-sm font-medium">90%</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
          <div className="col-span-4 space-y-2 md:col-span-1">
            <div className="flex justify-between">
              <span className="text-sm">Advocacy</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Customer Journey Map</h2>
          
          <div className="space-y-8">
            {/* Phase 1: Acquisition */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      1
                    </div>
                    <span>Acquisition Phase</span>
                  </CardTitle>
                  <Badge className="bg-green-500">Completed</Badge>
                </div>
                <CardDescription>
                  How the client was acquired and onboarded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Acquisition Details</h3>
                      <div className="space-y-1 rounded-md border p-3">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm text-muted-foreground">Source:</div>
                          <div className="text-sm font-medium">{client.journey.acquisition.source}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm text-muted-foreground">Campaign:</div>
                          <div className="text-sm font-medium">{client.journey.acquisition.campaign}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm text-muted-foreground">Date:</div>
                          <div className="text-sm font-medium">{new Date(client.journey.acquisition.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">First Purchase</h3>
                      <div className="space-y-1 rounded-md border p-3">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm text-muted-foreground">Date:</div>
                          <div className="text-sm font-medium">{new Date(client.journey.acquisition.firstOrder).toLocaleDateString()}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm text-muted-foreground">Time to Convert:</div>
                          <div className="text-sm font-medium">1 day</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Onboarding Milestones</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <Check className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="font-medium">Account Created</div>
                          <div className="text-sm text-muted-foreground">{new Date(client.journey.acquisition.date).toLocaleDateString()}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <Check className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="font-medium">Profile Completed</div>
                          <div className="text-sm text-muted-foreground">{new Date(client.journey.acquisition.date).toLocaleDateString()}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <Check className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="font-medium">First Purchase</div>
                          <div className="text-sm text-muted-foreground">{new Date(client.journey.acquisition.firstOrder).toLocaleDateString()}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <Check className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="font-medium">Welcome Email Opened</div>
                          <div className="text-sm text-muted-foreground">{new Date(client.journey.acquisition.date).toLocaleDateString()}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Acquisition Details
                </Button>
              </CardFooter>
            </Card>
            
            {/* Phase 2: Nurturing */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      2
                    </div>
                    <span>Nurturing Phase</span>
                  </CardTitle>
                  <Badge className="bg-blue-500">In Progress</Badge>
                </div>
                <CardDescription>
                  Building the relationship and understanding preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Engagement Metrics</h3>
                      <div className="space-y-3 rounded-md border p-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Email Engagement:</span>
                            <span className="text-sm font-medium">{client.journey.nurturing.emailEngagement}%</span>
                          </div>
                          <Progress value={client.journey.nurturing.emailEngagement} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Website Visits:</span>
                            <span className="text-sm font-medium">{client.journey.nurturing.webVisits} visits</span>
                          </div>
                          <Progress value={client.journey.nurturing.webVisits / 100 * 100} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Product Views:</span>
                            <span className="text-sm font-medium">{client.journey.nurturing.productViews} views</span>
                          </div>
                          <Progress value={client.journey.nurturing.productViews / 150 * 100} className="h-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Preferred Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {client.preferences.categories.map((category: string) => (
                          <Badge key={category} variant="outline" className="bg-secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Client Preferences</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Payment Method:</div>
                          <div className="font-medium">{client.preferences.paymentMethod}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Shipping Preference:</div>
                          <div className="font-medium">{client.preferences.shippingMethod}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Shopping Frequency:</div>
                          <div className="font-medium">Monthly</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Marketing Opt-in:</div>
                          <div className="font-medium">{client.preferences.marketingOpt ? "Yes" : "No"}</div>
                        </div>
                      </li>
                    </ul>
                    
                    <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950">
                      <h3 className="font-medium text-blue-800 dark:text-blue-300">Nurturing Recommendations</h3>
                      <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-400">
                        <li>• Send personalized recommendations for Audio products</li>
                        <li>• Offer exclusive Electronics preview</li>
                        <li>• Invite to Home Office webinar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Nurturing Strategy
                </Button>
              </CardFooter>
            </Card>
            
            {/* Phase 3: Loyalty */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      3
                    </div>
                    <span>Loyalty Phase</span>
                  </CardTitle>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <CardDescription>
                  Rewarding and retaining the client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Loyalty Status</h3>
                      <div className="rounded-md border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="font-medium">{client.journey.loyalty.tier}</span>
                          </div>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Top 5%
                          </Badge>
                        </div>
                        
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Current Points:</span>
                            <span className="font-medium">{client.journey.loyalty.points}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Next Reward:</span>
                            <span className="font-medium">50 points away</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Member Since:</span>
                            <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Lifetime Value</h3>
                      <div className="rounded-md border p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Spent:</span>
                          <span className="font-medium">${client.totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Orders:</span>
                          <span className="font-medium">{client.lifetime.orders}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Avg. Order Value:</span>
                          <span className="font-medium">${client.lifetime.avgValue.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">VIP Benefits</h3>
                    <ul className="space-y-3">
                      {client.journey.loyalty.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                            <Check className="h-3 w-3" />
                          </div>
                          <div>
                            <div className="font-medium">{benefit}</div>
                            <div className="text-sm text-muted-foreground">
                              {index === 0 && "Free shipping on all orders"}
                              {index === 1 && "24/7 dedicated support line"}
                              {index === 2 && "48-hour early access to new products"}
                              {index === 3 && "Annual gift on client's birthday"}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 rounded-md border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950">
                      <h3 className="font-medium text-purple-800 dark:text-purple-300">Upcoming VIP Events</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CalendarDays className="mt-0.5 h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <div>
                            <div className="font-medium text-purple-700 dark:text-purple-300">Summer VIP Preview</div>
                            <div className="text-purple-600 dark:text-purple-400">June 15, 2025 - Exclusive access to summer collection</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CalendarDays className="mt-0.5 h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <div>
                            <div className="font-medium text-purple-700 dark:text-purple-300">Platinum Member Event</div>
                            <div className="text-purple-600 dark:text-purple-400">July 10, 2025 - Cocktail reception with special offers</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Loyalty Program
                </Button>
              </CardFooter>
            </Card>
            
            {/* Phase 4: Advocacy */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      4
                    </div>
                    <span>Advocacy Phase</span>
                  </CardTitle>
                  <Badge className="bg-blue-500">In Progress</Badge>
                </div>
                <CardDescription>
                  Turning the client into a brand ambassador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Referral Activity</h3>
                      <div className="rounded-md border p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Referrals:</span>
                          <span className="font-medium">{client.journey.advocacy.referrals}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Successful Conversions:</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Referral Revenue:</span>
                          <span className="font-medium">$1,250.00</span>
                        </div>
                        <div className="mt-2">
                          <Button size="sm" variant="outline" className="w-full">
                            View Referral Network
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Social Engagement</h3>
                      <div className="rounded-md border p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Product Reviews:</span>
                          <span className="font-medium">{client.journey.advocacy.reviews}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Social Shares:</span>
                          <span className="font-medium">{client.journey.advocacy.socialShares}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Testimonials:</span>
                          <span className="font-medium">2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Advocacy Opportunities</h3>
                    <div className="space-y-4">
                      <div className="rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
                        <div className="flex items-start gap-2">
                          <Users className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-300">VIP Referral Program</h4>
                            <p className="text-sm text-green-700 dark:text-green-400">
                              Earn double rewards for each successful referral in the next 30 days.
                            </p>
                            <Button size="sm" variant="outline" className="mt-2 border-green-600 bg-white text-green-700 hover:bg-green-50 dark:border-green-700 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800">
                              Activate Bonus
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-3">
                        <h4 className="font-medium">Ambassador Program</h4>
                        <p className="text-sm text-muted-foreground">
                          Exclusive program for our most valued clients to represent our brand.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Eligibility: 85%</span>
                        </div>
                        <Progress value={85} className="mt-2 h-1" />
                        <div className="mt-3">
                          <Button size="sm" variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-3">
                        <h4 className="font-medium">Upcoming Advocacy Opportunities</h4>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <Gift className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Product Beta Testing</div>
                              <div className="text-muted-foreground">Invitation to test new products before release</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Settings className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Customer Advisory Board</div>
                              <div className="text-muted-foreground">Quarterly participation in product feedback sessions</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Develop Advocacy Strategy</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}