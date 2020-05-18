import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import ROUTES from '../../navigation/config/routes';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';

export interface HeaderRightProps {
  iconSize?: number;
}

const HeaderRight = (props: HeaderRightProps) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate(ROUTES.DRAWER.NOTIFICATION);
  }, [navigation]);

  const hitSlop = {top: 5, left: 5, right: 5, bottom: 5};

  return (
    <View style={styles.container}>
      <TouchableOpacity hitSlop={hitSlop} onPress={onPress}>
        <CustomIcon name="notification" size={props.iconSize || 24} color={theme.colors.white}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
});

export default HeaderRight;
