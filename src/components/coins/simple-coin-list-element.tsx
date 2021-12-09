import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';

export interface SimpleCoinListElementProps {
  name: string;
  logo?: string;
  type?: string;
  onPress?: () => void;
}

export default function SimpleCoinListElement(props: SimpleCoinListElementProps) {
  const {logo, name, type, onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftColumn}>
        <Image
          source={getImageSource(logo)}
          style={styles.logo}
        />
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: theme.colors.simpleCoinBackground,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 16,
  },
  rightColumn: {
    flex: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoPlaceholder: {
    backgroundColor: '#fff',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 20,
    color: theme.colors.white,
  },
  type: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 14,
    color: theme.colors.textLightGray,
    textTransform: 'uppercase',
  },
});
