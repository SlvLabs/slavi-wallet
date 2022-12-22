import React, {useCallback} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import SimpleToast from 'react-native-simple-toast';
import Layout from '../../utils/layout';

export interface TouchLinkProps {
  link: string;
  icon: string;
  label: string;
  iconSize?: number;
}

export function TouchLink({link, icon, label, iconSize}: TouchLinkProps) {
  const {t} = useTranslation();

  const onPress = useCallback(async () => {
    if (await Linking.canOpenURL(link)) {
      await Linking.openURL(link);
    } else {
      SimpleToast.show(t('Can not open link'));
    }
  }, [link, t]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CustomIcon name={icon} size={iconSize || 36} color={theme.colors.gold2} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    backgroundColor: theme.colors.tabsBackground,
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.isSmallDevice ? 138 : 157,
  },
  label: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    color: theme.colors.textLightGray,
    marginLeft: 16,
  },
});
