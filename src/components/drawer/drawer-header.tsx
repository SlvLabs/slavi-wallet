import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';

export interface DrawerHeaderProps {
  cryptoBalance: string;
  fiatBalance: string;
  cryptoTicker: string;
  fiatTicker: string;
}

const DrawerHeader = (props: DrawerHeaderProps) => {
  const {t} = useTranslation();
  return (
    <LinearGradient style={styles.container} {...theme.gradientsOld.drawerHeader}>
      <View style={styles.logo}>
        <CustomIcon
          name={'defi'}
          size={48}
          color={theme.colorsOld.drawerGray}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{t('Balance')}</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>
            {`${props.fiatBalance} ${props.fiatTicker} / ${props.cryptoBalance} ${props.cryptoTicker}`}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
  },
  logo: {
    padding: 8,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  content: {
    padding: 8,
  },
  labelContainer: {
    padding: 4,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: theme.colorsOld.drawerGray,
  },
  balanceContainer: {
    padding: 4,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  balance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: theme.colorsOld.white,
  },
});
