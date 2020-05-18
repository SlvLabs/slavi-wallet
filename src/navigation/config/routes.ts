const ROUTES = {
  INITIALIZATION: {
    LOCALIZATION: 'Initialization/Localization',
    PASSCODE: 'Initialization/Passcode',
    LICENSE_AGREEMENT: 'Initialization/LicenseAgreement',
  },
  ACCOUNT_INITIALIZATION: {
    MENU: 'Account/Menu',
    READY: 'Account/Ready',
    IMPORT_MENU: 'Account/ImportMenu',
    CREATE_MNEMONIC: 'Account/CreateMnemonic',
    CONFIRM_MNEMONIC: 'Account/ConfirmMnemonic',
  },
  DRAWER: {
    TABS: 'Drawer/Tabs',
    BILLING: 'Drawer/Billing',
    SETTINGS: 'Drawer/Settings',
    NOTIFICATION: 'Drawer/Notification',
  },
  TABS: {
    COINS: 'Tabs/Coins',
    DEFI: 'Tabs/Defi',
    OPERATIONS: 'Tabs/Operations',
    SWAP: 'Tabs/Swap',
    SETTINGS: 'Tabs/Exchange',
  },
  AUTHENTICATION: {
    LOGIN: 'Authentication/Login',
    RESTORE: 'Authentication/Restore',
  },
  BILLING: {
    LIST: 'Billing/List',
  },
  COINS: {
    LIST: 'Coins/List',
    INFO: 'Coins/Info',
    SEND: 'Coins/Send',
    RECEIVE: 'Coins/Receive',
    TOKEN_ADDING: 'Coins/TokenAdding',
    SUCCESSFULLY_SENDING: 'Coins/SuccessfullySending',
  },
  EXCHANGE: {
    MAIN: 'Exchange/Main',
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
  },
  NOTIFICATION: {
    LIST: 'Notification/List',
  },
};

export default ROUTES;
