import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from './custom-icon/custom-icon';
import theme from '../theme';
import React, {useCallback} from 'react';
import Layout from '../utils/layout';
import {useNavigation} from '@react-navigation/native';

export interface ScreenHeaderProps {
  title: string;
}

export default function ScreenHeader(props: ScreenHeaderProps) {
  const {title} = props;

  const navigation = useNavigation();

  const onBackPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      Keyboard.dismiss();
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.button, ...styles.backButton}} onPress={onBackPress}>
        <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 36,
    // paddingBottom: 12,
    paddingLeft: Layout.isSmallDevice ? 8 : 16,
    marginBottom: Layout.isSmallDevice ? 12 : 24,
    width: '100%',
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: Layout.isSmallDevice ? 15 : 18,
    lineHeight: 28,
    color: theme.colors.white,
  },
  headerContainer: {
    marginLeft: Layout.isSmallDevice ? -32 : -40, //-button.width
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
