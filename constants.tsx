
import React from 'react';
import { Wallet, Transaction, Goal, Project, Investment } from './types';
import { CreditCard, Landmark, Wallet as WalletIcon, Banknote, Briefcase, ShieldCheck, Coffee, ShoppingBag, Zap, Home } from 'lucide-react';

export const USD_TO_PKR = 280;

export const INITIAL_WALLETS: Wallet[] = [
  { id: 'w1', name: 'HBL Current', balance: 250000, icon: 'landmark', currency: 'PKR' },
  { id: 'w2', name: 'Payoneer (USD)', balance: 1500, icon: 'briefcase', currency: 'USD' },
  { id: 'w3', name: 'Binance (USDT)', balance: 500, icon: 'credit-card', currency: 'USD' },
  { id: 'w4', name: 'Physical Cash', balance: 45000, icon: 'banknote', currency: 'PKR' },
  { id: 'w5', name: 'Meezan Savings', balance: 500000, icon: 'shield-check', currency: 'PKR' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-05-20', description: 'Upwork Payout', amount: 800, type: 'Income', project_tag: 'App Dev', sub_category: 'Business', wallet_id: 'w2' },
  { id: 't2', date: '2024-05-19', description: 'Office Rent', amount: 35000, type: 'Expense', project_tag: 'Infrastructure', sub_category: 'Business', wallet_id: 'w1' },
  { id: 't3', date: '2024-05-18', description: 'Groceries', amount: 12500, type: 'Expense', project_tag: 'Personal', sub_category: 'Personal', wallet_id: 'w4' },
  { id: 't4', date: '2024-05-17', description: 'Client Retainer', amount: 250, type: 'Income', project_tag: 'Branding', sub_category: 'Business', wallet_id: 'w2' },
  { id: 't5', date: '2024-05-16', description: 'Electricity', amount: 18000, type: 'Expense', project_tag: 'Utilities', sub_category: 'Personal', wallet_id: 'w1' },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'p1', storeName: 'Digital Vertex Solutions', notes: 'Full stack development for SaaS product.', comments: 'Milestone 1 completed.', date: '2024-04-12', servicesRequired: 'Next.js, Tailwind, Node' },
  { id: 'p2', storeName: 'Luxe E-com Portal', notes: 'Shopify theme customization and app integration.', comments: 'Ongoing support.', date: '2024-05-01', servicesRequired: 'Liquid, Shopify API' }
];

export const INITIAL_INVESTMENTS: Investment[] = [
  { id: 'i1', type: 'Crypto', platform: 'Binance', assetName: 'BTC', quantity: 0.045, valuePKR: 850000, date: '2024-01-10' },
  { id: 'i2', type: 'Crypto', platform: 'MetaMask', assetName: 'ETH', quantity: 1.2, valuePKR: 920000, date: '2024-02-15' },
  { id: 'i3', type: 'Gold', platform: 'Bank Locker', assetName: '24k Gold', quantity: 20, valuePKR: 580000, date: '2023-11-20' },
];

export const INITIAL_GOALS: Goal[] = [
  { id: 'g1', name: 'Emergency Fund', target_amount: 1500000, current_amount: 500000, deadline: '2024-12-31' },
  { id: 'g2', name: 'MacBook M3 Pro', target_amount: 650000, current_amount: 210000, deadline: '2024-08-31' },
];

export const PROJECT_TAGS = [
  'App Dev', 
  'Branding', 
  'Infrastructure', 
  'SaaS Consulting', 
  'Shopify Setup', 
  'Personal',
  'Utilities',
  'Leisure'
];

export const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'landmark': return <Landmark className={className} />;
    case 'briefcase': return <Briefcase className={className} />;
    case 'credit-card': return <CreditCard className={className} />;
    case 'banknote': return <Banknote className={className} />;
    case 'shield-check': return <ShieldCheck className={className} />;
    default: return <WalletIcon className={className} />;
  }
};
