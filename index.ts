import CashBalances, {CashBalanceReport, ReportSection, Account} from './data';

interface ReportAccountTotals {
  highest_account_name: string
  lowest_account: string
  average: any
}

/**
 * Takes a report section and returns a flattened list of accounts
 */
function getFlattenedListOfAccounts(section: ReportSection): Account[] {
  return [...section.accounts,
    ...section.nestedSection[0].accounts, ...section.nestedSection[0].nestedSection[0].accounts,
    ...section.nestedSection[0].nestedSection[0].nestedSection[0].accounts]
}

function CalculateAccountTotals(accounts: Account[]): ReportAccountTotals {
  return {
    highest_account_name: accounts.sort((a,b) => b.value - a.value).map(acc => a.name)[0] || "",
    lowest_account: accounts.sort((a,b) => a.value - b.value).map(acc => a.name)[0] || "",
    average: 0
  }
};


/**
 * Main Program entry. Flattens accounts and then outputs
 */
function main(): ReportAccountTotals {
  let accounts = [...getFlattenedListOfAccounts(CashBalances.assets),
    ...getFlattenedListOfAccounts(CashBalances.liabilitiesAndEquity)];

  return CalculateAccountTotals(accounts);
}