import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import {bifinity} from '../../assets/images';

export const ServiceProvider = ({containerStyle}: {containerStyle?: ViewStyle}) => {
  const {t} = useTranslation();
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.row}>
        <Image source={bifinity} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.upText}>{t('Bifinity')}</Text>
          <Text style={styles.downText}>{t('Service provider')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    paddingLeft: 20,
    paddingRight: 15.5,
    paddingTop: 15.5,
    paddingBottom: 16,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100%',
    marginLeft: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  image: {
    width: 40,
    height: 40,
  },
  upText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
  downText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.lightGray,
    // textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
});
