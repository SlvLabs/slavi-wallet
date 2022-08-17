export default {
  colors: {
    dark: '#171717',
    white: '#fff',
    whiteOpacity: 'rgba(255,255,255,0.8)',
    lightTransparent: 'rgba(255,255,255,0.08)',
    mediumTransparent: 'rgba(255,255,255,0.3)',
    hardTransparent: 'rgba(255,255,255,0.6)',
    quiteTransparent: 'rgba(255,255,255,0.5)',
    maxTransparent: 'rgba(255, 255, 255, 0.1)',
    gold: '#C1A96D',
    shadow: 'rgba(0, 0, 0, 0.3)',
    black: '#000',
    green: '#26C672',
    red: '#E8513B',
    lightGreen: '#26C672',
    darkGreen: '#17DC90',
    darkGreen1: '#4DA683',
    borderGreen: '#12D489',
    blackoutTransparent: 'rgba(13, 13, 13, 0.6)',
    grayDark: '#181A1F',
    lightGray: '#B8BEC6',
    borderGray: '#2D2F35',
    textLightGray: '#83858C',
    textDarkGray: '#3A3C44',
    darkBackground: 'rgba(10,10,12, 0.9)',
    mediumBackground: 'rgba(10,10,12, 0.4)',
    darkBackground2: 'rgba(21,21,21, 0.8)',
    lightBackground: 'rgba(128, 144,173, 0.1)',
    maxDarkBackground: '#0C1317',
    gold2: '#EACD6F',
    cardBackground2: '#0E1018',
    cardBackground3: '#13151A',
    textLightGray1: '#676A78',
    textLightGray2: '#E1E1E1',
    textLightGray3: '#828799',
    dark1: '#838D9B',
    lighter: '#F5F5F5',
    lightGrayBackground: '#C4C4C4',
    darkWord: '#030303',
    wordBorder: '#45464D',
    errorRed: '#FF5456',
    screenBackground: '#121418',
    balanceHeaderBackground: '#0A0A0C',
    simpleCoinBackground: 'rgba(128, 144, 173, 0.1)',
    inactiveGray: '#51545B',
    opacityButton: 'rgba(255, 255, 255, 0.2)',
    buttonBackground: 'rgba(14, 16, 24, 0.5)',
    contentBackground: '#0B0B0B',
    disabledButton: '#7D7D7D',
    tabsColor: '#242135',
    buttonv2: 'rgba(72, 81, 107, 0.6)',
    buttonv3: 'rgba(74, 58, 122, 0.6)',
    tabInactiveTitle: '#62607A',
    tatActiveTitle: '#372E51',
    placeholderText: '#7A7A7E',
    buttonBorder: 'rgba(128, 144, 173, 0.3)',
    lightScroll: '#636771',
  },
  /** @deprecated */
  colorsOld: {
    cultured: '#F5F4F6',
    gray: '#333333',
    lightGray: '#C4C4C4',
    darkGray: '#999999',
    pink: '#FB9189',
    melon: '#FFB1AB',
    mistyRose: '#FFD9D1',
    green: '#57D99A',
    red: '#E65F55',
    white: '#fff',
    black: '#000',
    blue: '#64A2FF',
    transparent: 'rgba(0, 0, 0, 0)',
    drawerGray: '#7F8A8E',
    drawerText: '#9DABC0',
    drawerBottom: '#415158',
    drawerTop: '#3A4853',

    /** @deprecated */
    accent: '#51516d',
    /** @deprecated */
    secondary: '#a8a8b6',

    /** @deprecated */
    orange: '#ffae00',
    /** @deprecated */
    darkRed: '#411616',
    /** @deprecated */
    darkGreen: '#336f07',

    text: {
      gray: '#333333',

      /** @deprecated */
      primary: '#000000',
      /** @deprecated */
      secondary: '#999999',
    },
    /** @deprecated */
    border: {
      primary: '#888',
      secondary: '#d2d2d2',
      dark: '#cbcbcb',
    },
    /** @deprecated */
    button: {
      primary: '#2288dc',
      secondary: '#a8a8b6',
    },
  },
  fonts: {
    default: 'Roboto',
    gilroy: 'Roboto',
  },
  gradients: {
    header: {
      colors: ['#000000', '#053930'],
      start: {x: 0.5, y: -0.2 },
      end: {x: 0.5, y: 1 }
    },
    cardGradient: {
      colors: ['#575B80', 'rgba(143, 155, 255, 0)'],
      start: {x: 0.5, y: 0.5 },
      end: {x: 0.5, y: 1 }
    },
    activeIcon: {
      colors: ['#17DC90', '#067e50'],
      locations: [0,0.7]
    },
    inactiveIcon: {
      colors: ['#FFE39C', '#ab9160'],
      locations: [0,0.7]
    },
    radialLoadingGradient: {
      colors: ['rgba(40, 160, 129, 0.2)', 'rgba(19, 34, 55, 0)'],
      center: [100,250],
      radius: 400
    },
    radialBackgroundGradient: {
      colors: ['rgba(40, 160, 129, 0.2)', 'rgba(19, 34, 55, 0)'],
      center: [100,100],
      radius: 250
    },
    radialWavesGradient: {
      colors: ['rgba(107, 40, 160, 0.5)', 'rgba(46, 19, 55, 0)'],
      center: [85.5, 72.5],
      radius: 150,
    },
    radialWavesGradient2: {
      colors: ['rgba(107, 40, 160, 0.5)', 'rgba(46, 19, 55, 0)'],
      center: [365, 404],
      radius: 150,
    },
    button: {
      colors: ['#00CB7C', '#00785B',],
      locations: [0.5, 1],
      useAngle: true,
      angle: 62,
      angleCenter: { x: 0.5, y: 0.5 },
    },

    disabledButton: {
      colors: ['#2C2E33', '#26282D',],
      locations: [0.5, 1],
      useAngle: true,
      angle: 62,
      angleCenter: { x: 0.5, y: 0.5 },
    },
    activeTab: {
      colors: ['#2D303E', 'rgba(35, 38, 48, 0.5)'],
      locations: [0.1, 1],
      useAngle: false,
    },
    activeTabV2: {
      colors: ['#EBE5FC', '#b099d0'],
      locations: [0, 1],
      useAngle: false,
    },
    screenBackground: {
      colors: ['#272B35', '#181A20'],
      useAngle: true,
      angle: 154.67,
    },
  },
  gradientsOld: {
    default: {
      colors: ['#FF8880', '#F4B490'],
      start: {x: 0, y: 0},
      end: {x: 0, y: 1},
      useAngle: true,
      angle: 90,
    },
    drawer: {
      colors: ['#504446', '#415158'],
      start: {x: 0, y: 0},
      end: {x: 0, y: 1},
      useAngle: true,
      angle: 167,
    },
    drawerHeader: {
      colors: ['#3A4853', '#555C6A'],
      start: {x: 0, y: 0},
      end: {x: 0, y: 1},
      useAngle: true,
      angle: 90,
    },
    drawerActiveBackground: {
      colors: ['#596E86', '#46565F'],
      start: {x: 0, y: 0},
      end: {x: 0, y: 1},
      useAngle: true,
      angle: 90,
    },
    drawerActiveBorder: {
      colors: ['#D4AF94', '#EA8174'],
      start: {x: 0, y: 0},
      end: {x: 0, y: 1},
      useAngle: true,
      angle: 180,
    },
  },
};
