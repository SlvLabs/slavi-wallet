import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import React, {useCallback} from 'react';
import getImageSource from '../../utils/get-image-source';
import NetworkShownCheckbox from './network-shown-checkbox';

export interface NftFilterBlockchainRowProps {
  id: string;
  name: string;
  logo: string | undefined;
  shown: boolean;
  toggleNetworkHide(id: string): void;
}

export default function NftFilterBlockchainRow({
  id,
  shown,
  name,
  logo,
  toggleNetworkHide,
}: NftFilterBlockchainRowProps) {
  const onPress = useCallback(() => {
    toggleNetworkHide(id);
  }, [id, toggleNetworkHide]);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <NetworkShownCheckbox shown={shown} onPress={onPress} />
      <Image source={getImageSource(logo)} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tmp: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    padding: 0,
    margin: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 58,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  image: {
    width: 32,
    height: 32,
    marginLeft: 22,
  },
  name: {
    marginLeft: 20,
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.white,
  },
});
