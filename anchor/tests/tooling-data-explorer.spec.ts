import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { ToolingDataExplorer } from '../target/types/tooling_data_explorer';

describe('tooling-data-explorer', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace
    .ToolingDataExplorer as Program<ToolingDataExplorer>;

  const toolingDataExplorerKeypair = Keypair.generate();

  it('Initialize ToolingDataExplorer', async () => {
    await program.methods
      .initialize()
      .accounts({
        toolingDataExplorer: toolingDataExplorerKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([toolingDataExplorerKeypair])
      .rpc();

    const currentCount = await program.account.toolingDataExplorer.fetch(
      toolingDataExplorerKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment ToolingDataExplorer', async () => {
    await program.methods
      .increment()
      .accounts({ toolingDataExplorer: toolingDataExplorerKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.toolingDataExplorer.fetch(
      toolingDataExplorerKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment ToolingDataExplorer Again', async () => {
    await program.methods
      .increment()
      .accounts({ toolingDataExplorer: toolingDataExplorerKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.toolingDataExplorer.fetch(
      toolingDataExplorerKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement ToolingDataExplorer', async () => {
    await program.methods
      .decrement()
      .accounts({ toolingDataExplorer: toolingDataExplorerKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.toolingDataExplorer.fetch(
      toolingDataExplorerKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set toolingDataExplorer value', async () => {
    await program.methods
      .set(42)
      .accounts({ toolingDataExplorer: toolingDataExplorerKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.toolingDataExplorer.fetch(
      toolingDataExplorerKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the toolingDataExplorer account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        toolingDataExplorer: toolingDataExplorerKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.toolingDataExplorer.fetchNullable(
      toolingDataExplorerKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
