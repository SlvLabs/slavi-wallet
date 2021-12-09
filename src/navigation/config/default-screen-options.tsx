import {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
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
  cardStyle: { backgroundColor: theme.colors.screenBackground },
};

export default defaultScreenOption;
