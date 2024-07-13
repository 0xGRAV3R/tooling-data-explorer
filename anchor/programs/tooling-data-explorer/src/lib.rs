#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("FkCxDVEvwyDbffGa7RGsrm8nwyn6d31JN6nnNdzPkn9n");

#[program]
pub mod tooling_data_explorer {
    use super::*;

  pub fn close(_ctx: Context<CloseToolingDataExplorer>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tooling_data_explorer.count = ctx.accounts.tooling_data_explorer.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tooling_data_explorer.count = ctx.accounts.tooling_data_explorer.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeToolingDataExplorer>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.tooling_data_explorer.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeToolingDataExplorer<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + ToolingDataExplorer::INIT_SPACE,
  payer = payer
  )]
  pub tooling_data_explorer: Account<'info, ToolingDataExplorer>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseToolingDataExplorer<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub tooling_data_explorer: Account<'info, ToolingDataExplorer>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub tooling_data_explorer: Account<'info, ToolingDataExplorer>,
}

#[account]
#[derive(InitSpace)]
pub struct ToolingDataExplorer {
  count: u8,
}
