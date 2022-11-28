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
  COINS: {
    LIST: 'Coins/List',
    INFO: 'Coins/Info',
    SEND: 'Coins/Send',
    RECEIVE: 'Coins/Receive',
    BUY_COIN: 'Coins/Buy',
    BUY_COIN_WEB_VIEW: 'Coins/BuyWebView',
    TOKEN_ADDING: 'Coins/TokenAdding',
    SUCCESSFULLY_SENDING: 'Coins/SuccessfullySending',
    COINS_SELECT: 'Coins/Select',
    NFT_INFO: 'Coins/NftInfo',
    NFT_SEND: 'Coins/NftSend',
    NFT_SUCCESS: 'Coins/NftSuccess',
    FULL_LIST: 'Coins/FullList',
  },
  OPERATIONS: {
    LIST: 'Operations/List',
    DETAILS: 'Operations/Details',
  },
  SETTINGS: {
    MAIN: 'Settings/Main',
    EXPORT_MNEMONIC: 'Settings/MnemonicExport',
    IMPORT_MNEMONIC: 'Settings/MnemonicImport',
    LANGUAGE: 'Settings/Language',
    CURRENCY_CHANGE: 'Settings/CurrencyChange',
    INVALIDATE_CACHES: 'Settings/InvalidateCaches',
    NOTIFICATION_SETTINGS: 'Settings/NotificationSettings',
    WALLET_CONNECT: 'Settings/WalletConnect',
    SECURITY: 'Settings/Security',
    AUTO_BLOCKING: 'Settings/AutoBlocking',
  },
  NOTIFICATION: {
    LIST: 'Notification/List',
  },
  EARN: {
    MAIN: 'Defi/Main',
    INVESTMENT: 'Defi/Main',
  },
  SWAP: {
    MAIN: 'Swap/Main',
  },
  SETTINGS_SECURITY: {
    MAIN: 'SettingsSecurity/Main',
    AUTO_BLOCKING: 'SettingsSecurity/AutoBlocking',
  },
};

export default ROUTES;
