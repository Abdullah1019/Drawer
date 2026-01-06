
export type TransactionType = 'Income' | 'Expense';
export type SubCategory = 'Personal' | 'Business';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  project_tag: string;
  sub_category: SubCategory;
  wallet_id: string;
  notes?: string;
}

export interface Project {
  id: string;
  storeName: string;
  notes: string;
  comments: string;
  date: string;
  servicesRequired: string;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  icon: string;
  currency: string;
}

export interface Goal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
}

export type InvestmentType = 'Crypto' | 'Gold' | 'Stock' | 'Other';

export interface Investment {
  id: string;
  type: InvestmentType;
  platform: string; // App or Locker
  assetName: string; // Token name or Gold type (24k)
  quantity: number; // Tokens or Weight
  valuePKR: number; // Value in Rupees
  date: string;
}

export interface FinanceState {
  transactions: Transaction[];
  projects: Project[];
  wallets: Wallet[];
  goals: Goal[];
  investments: Investment[];
  budget: number;
}
