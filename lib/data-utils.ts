import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Dummy data generators
export function generateAdmins(count = 10) {
  const roles = ["Super Admin", "Admin", "Editor", "Viewer"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `admin-${i + 1}`,
    name: `Admin ${i + 1}`,
    email: `admin${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

export function generateSubscriptions(count = 10) {
  const types = ["Basic", "Standard", "Premium", "Enterprise"];
  const statuses = ["Active", "Inactive", "Pending"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `sub-${i + 1}`,
    name: `Subscription Plan ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    price: Math.floor(Math.random() * 500) + 50,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
}

export function generateClients(count = 20) {
  const types = ["Particular", "Manager", "Affiliate", "Vendor"];
  const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emma", "Robert", "Lisa"];
  const lastNames = ["Smith", "Johnson", "Brown", "Davis", "Wilson", "Moore", "Taylor", "Anderson"];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      id: `client-${i + 1}`,
      name: `${firstName} ${lastName}`,
      type: types[Math.floor(Math.random() * types.length)],
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1${Math.floor(Math.random() * 1000000000)}`,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
}

export function generateInteractions(clientId: string, count = 15) {
  const types = ["Purchase", "Email", "Call", "Support", "Event", "Note"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `interaction-${clientId}-${i + 1}`,
    clientId,
    type: types[Math.floor(Math.random() * types.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toISOString(),
    description: `Interaction description ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateSegments(count = 8) {
  const criteriaTypes = ["RFM", "Product", "Region", "Behavior", "Demographics"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `segment-${i + 1}`,
    name: `Segment ${i + 1}`,
    description: `Description for segment ${i + 1}`,
    criteria: criteriaTypes[Math.floor(Math.random() * criteriaTypes.length)],
    count: Math.floor(Math.random() * 500) + 50,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}