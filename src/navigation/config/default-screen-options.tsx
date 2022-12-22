import {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/types';
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
  cardStyle: {backgroundColor: theme.colors.screenBackground},
  headerShown: false,
};

export default defaultScreenOption;
