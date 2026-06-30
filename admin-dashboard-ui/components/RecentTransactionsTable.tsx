'use client';

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ExternalLink,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

interface Transaction {
  id: string;
  txHash: string;
  clientName: string;
  clientEmail: string;
  clientInitials: string;
  product: string;
  amount: number;
  status: 'paid' | 'pending' | 'declined';
  date: string;
  time: string;
}

interface RecentTransactionsTableProps {
  searchQuery?: string;
}

export default function RecentTransactionsTable({ searchQuery = '' }: RecentTransactionsTableProps) {
  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'declined'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      txHash: 'TXN-90284',
      clientName: 'Aria Sterling',
      clientEmail: 'aria@vortexlabs.io',
      clientInitials: 'AS',
      product: 'Enterprise Nodes',
      amount: 4500.00,
      status: 'paid',
      date: 'Jun 23, 2026',
      time: '04:12 PM',
    },
    {
      id: '2',
      txHash: 'TXN-83921',
      clientName: 'Daniel Craig',
      clientEmail: 'd.craig@orion.dev',
      clientInitials: 'DC',
      product: 'Developer Subscriptions',
      amount: 149.00,
      status: 'paid',
      date: 'Jun 23, 2026',
      time: '02:30 PM',
    },
    {
      id: '3',
      txHash: 'TXN-73412',
      clientName: 'Lina Vance',
      clientEmail: 'lina@solaris.net',
      clientInitials: 'LV',
      product: 'High CPU Instance AWS-X',
      amount: 890.50,
      status: 'pending',
      date: 'Jun 22, 2026',
      time: '11:45 AM',
    },
    {
      id: '4',
      txHash: 'TXN-61842',
      clientName: 'Marcus Aurelius',
      clientEmail: 'marcus@stoic.org',
      clientInitials: 'MA',
      product: 'Enterprise Firewall API',
      amount: 1250.00,
      status: 'paid',
      date: 'Jun 21, 2026',
      time: '09:15 AM',
    },
    {
      id: '5',
      txHash: 'TXN-59281',
      clientName: 'Emily Watson',
      clientEmail: 'emily.w@nexus.tech',
      clientInitials: 'EW',
      product: 'DevOps Advisory Suite',
      amount: 3200.00,
      status: 'declined',
      date: 'Jun 20, 2026',
      time: '03:10 PM',
    },
    {
      id: '6',
      txHash: 'TXN-48291',
      clientName: 'Tariq Al-Fatah',
      clientEmail: 'tariq@halalcloud.com',
      clientInitials: 'TA',
      product: 'S3 Multi-Region Vault',
      amount: 600.00,
      status: 'paid',
      date: 'Jun 19, 2026',
      time: '01:05 PM',
    },
    {
      id: '7',
      txHash: 'TXN-39102',
      clientName: 'Natalie Portman',
      clientEmail: 'natalie@lucasfilm.org',
      clientInitials: 'NP',
      product: 'NexSoft Dedicated Firewall',
      amount: 2450.00,
      status: 'pending',
      date: 'Jun 18, 2026',
      time: '10:30 AM',
    }
  ]);

  // Filter logic: search and status filter combined
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.product.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: 'paid' | 'pending' | 'declined') => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500 dark:text-emerald-400">
            <CheckCircle className="h-3 w-3" /> Paid
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500 dark:text-amber-400">
            <Clock className="h-3 w-3 animate-pulse" /> Pending
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-500 dark:text-rose-400">
            <XCircle className="h-3 w-3" /> Declined
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-sm flex flex-col h-full">
      {/* Header with Search/Filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-primary text-base md:text-lg">
            Recent Transactions
          </h3>
          <p className="text-xs text-muted mt-1">
            Auditable corporate node billing and client payments.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl w-fit">
          <button
            onClick={() => { setStatusFilter('all'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === 'all' ? 'bg-surface text-primary shadow-sm' : 'text-secondary hover:text-slate-900 dark:hover:text-slate-300'}`}
          >
            All
          </button>
          <button
            onClick={() => { setStatusFilter('paid'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === 'paid' ? 'bg-surface text-emerald-500 shadow-sm' : 'text-muted hover:text-primary'}`}
          >
            Paid
          </button>
          <button
            onClick={() => { setStatusFilter('pending'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === 'pending' ? 'bg-surface text-amber-500 shadow-sm' : 'text-muted hover:text-primary'}`}
          >
            Pending
          </button>
          <button
            onClick={() => { setStatusFilter('declined'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === 'declined' ? 'bg-surface text-rose-500 shadow-sm' : 'text-muted hover:text-primary'}`}
          >
            Declined
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle px-6">
          <table className="min-w-full divide-y divide-border-border-subtle">
            <thead>
              <tr className="text-left text-xs font-semibold text-muted uppercase tracking-wider">
                <th className="py-3 pr-4">Tx Hash</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Deployment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 pl-4 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-border-subtle">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="text-xs group hover:bg-surface-hover transition-colors">
                    {/* ID */}
                    <td className="py-4 pr-4 font-mono font-medium text-secondary whitespace-nowrap">
                      {tx.txHash}
                    </td>

                    {/* Client info */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-purple/10 to-brand-teal/10 flex items-center justify-center font-bold text-primary">
                          {tx.clientInitials}
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{tx.clientName}</p>
                          <p className="text-[10px] text-muted">{tx.clientEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-4 px-4 whitespace-nowrap text-secondary font-medium">
                      {tx.product}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(tx.status)}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 whitespace-nowrap text-right font-bold text-primary">
                      ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions panel */}
                    <td className="py-4 pl-4 whitespace-nowrap text-right pr-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => {
                            showToast(`Generating invoice receipt for ${tx.txHash}...`, 'info');
                            setTimeout(() => {
                              showToast(`Invoice receipt downloaded for ${tx.txHash}.`, 'success');
                            }, 1000);
                          }}
                          className="p-1.5 rounded-lg hover:bg-surface-hover text-muted hover:text-primary transition-all inline-flex items-center cursor-pointer"
                          title="Download Invoice"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            const nextStatusMap: Record<Transaction['status'], Transaction['status']> = {
                              'paid': 'pending',
                              'pending': 'declined',
                              'declined': 'paid'
                            };
                            const newStatus = nextStatusMap[tx.status];
                            setTransactions(prev => prev.map(t => t.id === tx.id ? { ...t, status: newStatus } : t));
                            showToast(`Transaction ${tx.txHash} status updated to ${newStatus.toUpperCase()}.`, 'success');
                          }}
                          className="p-1.5 rounded-lg hover:bg-surface-hover text-muted hover:text-primary transition-all inline-flex items-center cursor-pointer"
                          title="Cycle Status"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            setTransactions(prev => prev.filter(t => t.id !== tx.id));
                            showToast(`Transaction ${tx.txHash} has been deleted.`, 'warning');
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 text-muted transition-all inline-flex items-center cursor-pointer"
                          title="Delete Transaction"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted font-medium">
                    No transactions match your search filter constraints.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Pagination Footer */}
      {filteredTransactions.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-subtle pt-4 mt-4">
          <p className="text-xs text-muted font-medium text-center sm:text-left">
            Showing <span className="font-semibold text-primary">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-primary">
              {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}
            </span>{' '}
            of <span className="font-semibold text-primary">{filteredTransactions.length}</span> transactions
          </p>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default bg-surface text-secondary hover:bg-surface-hover disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-semibold text-secondary">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default bg-surface text-secondary hover:bg-surface-hover disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
