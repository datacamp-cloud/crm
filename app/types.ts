export type Client = {
  id: string;
  name: string;
  email: string;
  type: string;
  points?: number;
  tier?: 'Bronze' | 'Silver' | 'Gold';
  lastActivity?: string;
  createdAt?: string;
  referral?: string;
}