import {Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import CustomIcon from './custom-icon/custom-icon';
import theme from '../theme';
import React, {ReactNode, useCallback} from 'react';
import Layout from '../utils/layout';
import {useNavigation} from '@react-navigation/native';

export interface ScreenHeaderProps {
  title: string;
  controls?: ReactNode;
  disableBackButton?: boolean;
  headerContainerStyle?: ViewStyle;
  titleContainerStyle?: ViewStyle;
}

export default function ScreenHeader(props: ScreenHeaderProps) {
  const {
    title,
    controls,
    headerContainerStyle,
    titleContainerStyle,
    disableBackButton
  } = props;

  const navigation = useNavigation();

  const onBackPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      Keyboard.dismiss();
    }
  }, [navigation]);

  return (
    <View style={{...styles.container, ...headerContainerStyle}}>
      {!disableBackButton && (
        <TouchableOpacity style={{
          ...styles.button,
          ...styles.backButton,
        }} onPress={onBackPress}>
          <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
      )}
      <View style={{
        ...styles.headerContainer,
        ...titleContainerStyle,
        ...(!!disableBackButton ? {} : styles.headerContainerWithBackButton)
      }}>
        <Text style={styles.header}>{title}</Text>
      </View>
      {!!controls && (
        <View style={styles.controls}>
          {controls}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.isSmallDevice ? 12 : 24,
    width: '100%',
    ...Platform.select({
      ios: {
        paddingTop: Layout.isSmallDevice ? 20 : 50,
      },
      android: {
        paddingTop: 36,
      }
    })
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
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
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainerWithBackButton: {
    marginLeft: Layout.isSmallDevice ? -32 : -40,
  }
});
