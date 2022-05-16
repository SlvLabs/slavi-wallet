import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from './custom-icon/custom-icon';
import theme from '../theme';
import React, {ReactNode, useCallback} from 'react';
import Layout from '../utils/layout';
import {useNavigation} from '@react-navigation/native';

export interface ScreenHeaderProps {
  title: string;
  rightContent?: ReactNode;
}

export default function ScreenHeader(props: ScreenHeaderProps) {
  const {title, rightContent} = props;

  const navigation = useNavigation();

  const onBackPress = useCallback(() => {
    if(navigation.canGoBack()) {
      navigation.goBack();
      Keyboard.dismiss();
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.button, ...styles.backButton}} onPress={onBackPress}>
        <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
      </TouchableOpacity>
      <Text style={styles.header}>{title}</Text>
      <View>
        {rightContent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 12,
    marginBottom: 18,
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
    fontSize: Layout.isSmallDevice ? 14 : 18,
    lineHeight: 28,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  backButton: {
    transform: [{
      rotate: '180deg',
    }],
  },
});
