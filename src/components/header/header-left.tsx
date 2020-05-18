import {useNavigation} from '@react-navigation/native';
import {StackHeaderLeftButtonProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../theme';

interface HeaderLeftProps extends StackHeaderLeftButtonProps {}

const HeaderLeft = (props: HeaderLeftProps) => {
  const {canGoBack} = props;
  const navigation = useNavigation();

  const icon = React.useMemo(() => {
    return {
      name: canGoBack ? 'arrow-back' : 'menu',
      type: canGoBack ? 'material' : 'entypo',
    };
  }, [canGoBack]);

  const onPress = React.useCallback(() => {
    if (canGoBack) {
      navigation.goBack();
    } else {
      navigation.openDrawer();
    }
  }, [canGoBack, navigation]);

  const hitSlop = {top: 5, left: 5, right: 5, bottom: 5};

  return (
    <View style={styles.container}>
      <TouchableOpacity hitSlop={hitSlop} onPress={onPress}>
        <Icon size={32} {...icon} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default HeaderLeft;
