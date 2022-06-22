import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../theme';
import Layout from '../../utils/layout';

interface NoticeRowProps {
  text: string;
  iconColor?: string;
  textStyle?: ViewStyle;
}

const NoticeRow = (props: NoticeRowProps) => {
  const {text, iconColor, textStyle} = props;

  return (
    <View style={styles.container}>
      <Icon
        name={'alert-circle'}
        type={'feather'}
        color={iconColor || theme.colorsOld.white}
        style={styles.icon}
      />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    color: theme.colors.white,
    marginTop: Layout.isSmallDevice ? 4 : 16,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: theme.colorsOld.white,
  },
});

export default NoticeRow;
