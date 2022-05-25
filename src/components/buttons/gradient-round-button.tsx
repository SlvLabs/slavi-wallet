import React, {useCallback} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';

export interface GradientRoundButtonProps {
  onPress: () => void;
  iconName: string;
  label: string;
  image: ImageSourcePropType;
  iconSize?: number;
  disabled?: boolean;
}

export default function GradientRoundButton(props: GradientRoundButtonProps) {
  const {onPress, iconName, label, iconSize, disabled, image} = props;

  const _onPress = useCallback(() => {
    if(disabled) {
      return;
    }
    onPress();
  }, [onPress, disabled]);

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={_onPress} disabled={disabled}>
      {disabled ? (
        <View style={{...styles.button, ...styles.disabledButton}}>
          <CustomIcon
            name={iconName}
            color={theme.colors.textLightGray3}
            size={iconSize || 24}
          />
        </View>
      ) : (
        <Image source={image} style={styles.button} />
      )}
      <Text style={disabled ? {...styles.label, ...styles.disabledLabel} : styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  button: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  disabledButton: {
    backgroundColor: theme.colors.inactiveGray,
    borderRadius: 38,
  },
  disabledLabel: {
    color: theme.colors.textLightGray3,
  },
});
