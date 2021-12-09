import React, {useCallback} from 'react';
import {View, Text, Linking, TouchableOpacity, StyleSheet} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import SimpleToast from 'react-native-simple-toast';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';

export interface MainLinkProps {
  text: string;
  icon: string;
  link: string;
}

const MainLink = (props: MainLinkProps) => {
  const {t} = useTranslation();
  const onPress = useCallback(async () => {
    if (await Linking.canOpenURL(props.link)) {
      await Linking.openURL(props.link);
    } else {
      SimpleToast.show(t('Can not open link'));
    }
  }, [props.link, t]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <CustomIcon
          name={props.icon}
          size={36}
          color={theme.colors.gold2}
        />
      </TouchableOpacity>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.mediumBackground,
    borderRadius: 8,
    width: 76,
    height: 98,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.01,
    color: theme.colors.textLightGray,

  },
  labelContainer: {
    justifyContent: 'center',
    marginTop: 16,
  },
  card: {
    marginBottom: 8,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainLink;
