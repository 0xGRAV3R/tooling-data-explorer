'use client';

import {
  getToolingDataExplorerProgram,
  getToolingDataExplorerProgramId,
} from '@tooling-data-explorer/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useToolingDataExplorerProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getToolingDataExplorerProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getToolingDataExplorerProgram(provider);

  const accounts = useQuery({
    queryKey: ['tooling-data-explorer', 'all', { cluster }],
    queryFn: () => program.account.toolingDataExplorer.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['tooling-data-explorer', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ toolingDataExplorer: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useToolingDataExplorerProgramAccount({
  account,
}: {
  account: PublicKey;
}) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useToolingDataExplorerProgram();

  const accountQuery = useQuery({
    queryKey: ['tooling-data-explorer', 'fetch', { cluster, account }],
    queryFn: () => program.account.toolingDataExplorer.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['tooling-data-explorer', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ toolingDataExplorer: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['tooling-data-explorer', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods
        .decrement()
        .accounts({ toolingDataExplorer: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['tooling-data-explorer', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods
        .increment()
        .accounts({ toolingDataExplorer: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['tooling-data-explorer', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods
        .set(value)
        .accounts({ toolingDataExplorer: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
