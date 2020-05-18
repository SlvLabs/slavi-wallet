import React from 'react';
import CustomIcon from '../../custom-icon/custom-icon';
import theme from '../../../theme';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface FullFilterAddressElementProps {
  address: string;
  name?: string;
  selected?: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const FullFilterAddressElement = (props: FullFilterAddressElementProps) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...props.containerStyle}}
      onPress={props.onPress}>
      <View style={styles.topRow}>
        <Text style={styles.name}>
          {props.name ? props.name : props.address}
        </Text>
        <View style={styles.selectedIndicator}>
          {props.selected && (
            <CustomIcon name={'check'} size={24} color={theme.colorsOld.pink} />
          )}
        </View>
      </View>
      {!!props.name && (
        <View style={styles.bottomRow}>
          <Text style={styles.address}>{props.address}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorsOld.cultured,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 24,
    color: theme.colorsOld.gray,
  },
  selectedIndicator: {},
  bottomRow: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 10,
    color: theme.colorsOld.lightGray,
  },
});

export default FullFilterAddressElement;
