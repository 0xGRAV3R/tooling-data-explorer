// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import ToolingDataExplorerIDL from '../target/idl/tooling_data_explorer.json';
import type { ToolingDataExplorer } from '../target/types/tooling_data_explorer';

// Re-export the generated IDL and type
export { ToolingDataExplorer, ToolingDataExplorerIDL };

// The programId is imported from the program IDL.
export const TOOLING_DATA_EXPLORER_PROGRAM_ID = new PublicKey(
  ToolingDataExplorerIDL.address
);

// This is a helper function to get the ToolingDataExplorer Anchor program.
export function getToolingDataExplorerProgram(provider: AnchorProvider) {
  return new Program(ToolingDataExplorerIDL as ToolingDataExplorer, provider);
}

// This is a helper function to get the program ID for the ToolingDataExplorer program depending on the cluster.
export function getToolingDataExplorerProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return TOOLING_DATA_EXPLORER_PROGRAM_ID;
  }
}
