import React from 'react';
import {View, Text, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../theme';

export interface FilterTagProps {
  text: string;
  onRemove: () => void;
  containerStyle?: ViewStyle;
  tagStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
}

const FilterTag = (props: FilterTagProps) => {
  return (
    <View style={props.containerStyle}>
      <View style={{...styles.tag, ...props.tagStyle}}>
        <Text style={{...styles.text, ...props.textStyle}}>{props.text}</Text>
        <Icon
          name={'close'}
          type={'antdesign'}
          size={props.iconSize || 16}
          color={props.iconColor || theme.colorsOld.lightGray}
          onPress={props.onRemove}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: theme.colorsOld.cultured,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: theme.colorsOld.gray,
    marginRight: 5,
  },
});

export default FilterTag;
