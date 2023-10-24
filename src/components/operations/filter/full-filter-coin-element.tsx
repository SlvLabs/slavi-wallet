import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import getImageSource from '../../../utils/get-image-source';
import {Image} from 'react-native-elements';
import CoinType from '@slavi/wallet-core/src/utils/coin-types';
import CustomIcon from '../../custom-icon/custom-icon';
import theme from '../../../theme';

export interface FullFilterCoinElementProps {
  name: string;
  onPress: () => void;
  logo?: string;
  type?: CoinType;
  selected?: boolean;
}

const FullFilterCoinElement = (props: FullFilterCoinElementProps) => {
  const containerStyle = props.selected ? {...styles.container, ...styles.containerActive} : styles.container;
  return (
    <TouchableOpacity style={containerStyle} onPress={props.onPress}>
      <View style={styles.leftColumn}>
        <View style={styles.logoContainer}>
          <Image
            source={getImageSource(props.logo)}
            style={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={styles.logoPlaceholder}
          />
        </View>
        <View />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        {props.type && (
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{props.type}</Text>
          </View>
        )}
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.selectedIndicator}>
          {props.selected && <CustomIcon name={'check'} size={24} color={theme.colors.green} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.lightBackground,
    padding: 16,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    alignItems: 'center',
  },
  logoContainer: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoPlaceholder: {},
  nameContainer: {
    paddingRight: 8,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.lightGray,
  },
  typeContainer: {
    borderRadius: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  type: {
    marginLeft: 8,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 16,
    color: theme.colors.textLightGray1,
    textTransform: 'uppercase',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  selectedIndicator: {
    justifyContent: 'center',
  },
  leftColumn: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightColumn: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerActive: {
    backgroundColor: theme.colors.maxDarkBackground,
  },
});

export default FullFilterCoinElement;
