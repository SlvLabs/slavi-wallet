const ROUTES = {
  INITIALIZATION: {
    LOCALIZATION: 'Initialization/Localization',
    PASSCODE: 'Initialization/Passcode',
    LICENSE_AGREEMENT: 'Initialization/LicenseAgreement',
  },
  ACCOUNT_INITIALIZATION: {
    MENU: 'Account/Menu',
    READY: 'Account/Ready',
    IMPORT_MNEMONIC: 'Account/ImportMnemonic',
    CREATE_MNEMONIC: 'Account/CreateMnemonic',
    CONFIRM_MNEMONIC: 'Account/ConfirmMnemonic',
  },
  TABS: {
    COINS: 'Tabs/Coins',
    DEFI: 'Tabs/Defi',
    OPERATIONS: 'Tabs/Operations',
    SWAP: 'Tabs/Swap',
    SETTINGS: 'Tabs/Settings',
  },
  AUTHENTICATION: {
    LOGIN: 'Authentication/Login',
    RESTORE: 'Authentication/Restore',
  },
  COINS: {
    LIST: 'Coins/List',
    INFO: 'Coins/Info',
    SEND: 'Coins/Send',
    RECEIVE: 'Coins/Receive',
    TOKEN_ADDING: 'Coins/TokenAdding',
    SUCCESSFULLY_SENDING: 'Coins/SuccessfullySending',
    COINS_SELECT: 'Coins/Select',
  },
  OPERATIONS: {
    LIST: 'Operations/List',
  },
  SETTINGS: {
    MAIN: 'Settings/Main',
    EXPORT_MNEMONIC: 'Settings/MnemonicExport',
    IMPORT_MNEMONIC: 'Settings/MnemonicImport',
    LANGUAGE: 'Settings/Language',
    CURRENCY_CHANGE: 'Settings/CurrencyChange',
    INVALIDATE_CACHES: 'Settings/InvalidateCaches',
    WALLET_CONNECT: 'Settings/WalletConnect',
    SECURITY: 'Settings/Security',
  },
  NOTIFICATION: {
    LIST: 'Notification/List',
  },
  DEFI: {
    MAIN: 'Defi/Main',
  },
  SWAP: {
    MAIN: 'Swap/Main',
  },
};

export default ROUTES;
