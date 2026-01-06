
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TransactionManager } from './components/TransactionManager';
import { WalletCenter } from './components/WalletCenter';
import { Analytics } from './components/Analytics';
import { Projects } from './components/Projects';
import { Investments } from './components/Investments';
import { AIAssistant } from './components/AIAssistant';
import { Transaction, Wallet, Goal, FinanceState, Project, Investment } from './types';
import { INITIAL_WALLETS, INITIAL_TRANSACTIONS, INITIAL_GOALS, INITIAL_PROJECTS, INITIAL_INVESTMENTS, USD_TO_PKR } from './constants';

const STORAGE_KEY = 'dualstream_finance_live_v1';

const App: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState(USD_TO_PKR);
  
  const [state, setState] = useState<FinanceState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Critical: Failed to load database state.", e);
      }
    }
    return {
      transactions: INITIAL_TRANSACTIONS,
      projects: INITIAL_PROJECTS,
      wallets: INITIAL_WALLETS,
      goals: INITIAL_GOALS,
      investments: INITIAL_INVESTMENTS,
      budget: 150000 
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const id = `t-${Date.now()}`;
    const transaction: Transaction = { ...newTx, id };
    
    setState(prev => {
      const updatedWallets = prev.wallets.map(w => {
        if (w.id === transaction.wallet_id) {
          const balanceChange = transaction.type === 'Income' ? transaction.amount : -transaction.amount;
          return { ...w, balance: w.balance + balanceChange };
        }
        return w;
      });

      return {
        ...prev,
        transactions: [transaction, ...prev.transactions],
        wallets: updatedWallets,
      };
    });
  };

  const handleTransfer = (fromId: string, toId: string, amount: number) => {
    if (amount <= 0 || fromId === toId) return;
    
    setState(prev => {
      const fromWallet = prev.wallets.find(w => w.id === fromId);
      if (!fromWallet || fromWallet.balance < amount) {
        alert("Transaction Aborted: Insufficient funds in source wallet.");
        return prev;
      }

      const updatedWallets = prev.wallets.map(w => {
        if (w.id === fromId) return { ...w, balance: w.balance - amount };
        if (w.id === toId) return { ...w, balance: w.balance + amount };
        return w;
      });

      const transferRecord: Transaction = {
        id: `transfer-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: `Liquidity Shift: ${prev.wallets.find(w => w.id === fromId)?.name} ➔ ${prev.wallets.find(w => w.id === toId)?.name}`,
        amount: amount,
        type: 'Expense',
        project_tag: 'Internal Transfer',
        sub_category: 'Personal',
        wallet_id: fromId,
        notes: 'Asset reallocation'
      };

      return { 
        ...prev, 
        wallets: updatedWallets,
        transactions: [transferRecord, ...prev.transactions]
      };
    });
  };

  const handleAddProject = (newProj: Omit<Project, 'id'>) => {
    setState(prev => ({ ...prev, projects: [{ ...newProj, id: `p-${Date.now()}` }, ...prev.projects] }));
  };

  const handleAddInvestment = (newInv: Omit<Investment, 'id'>) => {
    setState(prev => ({ ...prev, investments: [{ ...newInv, id: `i-${Date.now()}` }, ...prev.investments] }));
  };

  const handleAddWallet = (newWallet: Omit<Wallet, 'id'>) => {
    setState(prev => ({ ...prev, wallets: [...prev.wallets, { ...newWallet, id: `w-${Date.now()}` }] }));
  };

  const handleUpdateWallet = (id: string, updates: Partial<Wallet>) => {
    setState(prev => ({ ...prev, wallets: prev.wallets.map(w => w.id === id ? { ...w, ...updates } : w) }));
  };

  const handleDeleteWallet = (id: string) => {
    if (!confirm("System Warning: Permanent deletion will remove this wallet's current balance. Proceed?")) return;
    setState(prev => ({ ...prev, wallets: prev.wallets.filter(w => w.id !== id) }));
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `DualStream_Backup_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedState = JSON.parse(event.target?.result as string);
        if (confirm("System Alert: This will overwrite your current local data with the backup file. Continue?")) {
          setState(importedState);
          window.location.reload();
        }
      } catch (err) {
        alert("Critical Error: Invalid backup file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <HashRouter>
      <Layout 
        onExport={handleExportData} 
        onImport={handleImportData}
      >
        <Routes>
          <Route path="/" element={<Dashboard state={state} />} />
          <Route path="/projects" element={<Projects projects={state.projects} onAddProject={handleAddProject} />} />
          <Route path="/transactions" element={<TransactionManager state={state} onAddTransaction={handleAddTransaction} />} />
          <Route path="/wallets" element={<WalletCenter 
            wallets={state.wallets} 
            onTransfer={handleTransfer}
            onAddWallet={handleAddWallet}
            onUpdateWallet={handleUpdateWallet}
            onDeleteWallet={handleDeleteWallet}
            exchangeRate={exchangeRate}
            setExchangeRate={setExchangeRate}
          />} />
          <Route path="/investments" element={<Investments investments={state.investments} goals={state.goals} wallets={state.wallets} onAddInvestment={handleAddInvestment} />} />
          <Route path="/analytics" element={<Analytics transactions={state.transactions} wallets={state.wallets} />} />
        </Routes>
        <AIAssistant 
          transactions={state.transactions} 
          wallets={state.wallets} 
          onAddTransaction={handleAddTransaction} 
        />
      </Layout>
    </HashRouter>
  );
};

export default App;
