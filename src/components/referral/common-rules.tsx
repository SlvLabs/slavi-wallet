import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

export function CommonRules() {
  const [opened, setOpened] = useState<boolean>(false);

  const {t} = useTranslation();

  const onPress = useCallback(() => setOpened(p => !p), []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t('referralRules')}</Text>
        <CustomIcon
          name={'arrow'}
          size={20}
          color={theme.colors.textLightGray3}
          style={opened ? styles.openedIcon : styles.closedIcon}
        />
      </View>
      {opened && <Text style={styles.body}>{t('referralCommonRules')}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
    paddingBottom: 11,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 28,
    color: theme.colors.white,
  },
  closedIcon: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  openedIcon: {
    transform: [
      {
        rotate: '-90deg',
      },
    ],
  },
  body: {
    fontFamily: theme.fonts.default,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
    color: theme.colors.lightGray,
  },
});
