import {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/types';
import HeaderLeft from '../../components/header/header-left';
import React from 'react';
import HeaderRight from '../../components/header/header-right';
import theme from '../../theme';

const defaultScreenOption: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleAllowFontScaling: false,
  headerStyle: {
    backgroundColor: theme.colors.black,
    borderBottomWidth: 0,
    shadowColor: theme.colors.black,
  },
  headerTintColor: theme.colors.white,
  headerLeft: props => <HeaderLeft {...props} />,
  headerRight: () => <HeaderRight />,
};

export default defaultScreenOption;
