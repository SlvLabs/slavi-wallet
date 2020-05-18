import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
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
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
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
          {props.selected && (
            <CustomIcon name={'check'} size={24} color={theme.colorsOld.pink} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colorsOld.cultured,
    padding: 16,
    borderRadius: 16,
    marginTop: 4,
    marginBottom: 4,
    alignItems: 'center',
  },
  logoContainer: {
    paddingRight: 4,
    paddingLeft: 4,
  },
  logo: {
    width: 24,
    height: 24,
  },
  logoPlaceholder: {},
  nameContainer: {
    paddingRight: 4,
    paddingLeft: 4,
    justifyContent: 'center',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 12,
    color: theme.colorsOld.gray,
  },
  typeContainer: {
    borderRadius: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
    backgroundColor: theme.colorsOld.lightGray,
    textAlignVertical: 'center',
  },
  type: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 10,
    color: theme.colorsOld.white,
    textTransform: 'uppercase',
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
});

export default FullFilterCoinElement;
