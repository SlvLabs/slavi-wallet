import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import Layout from '../../utils/layout';
import theme from '../../theme';
import getImageSource from '../../utils/get-image-source';
import {coinPlaceholder, hide, show} from '../../assets/images';
import NftImage from './nft-image';

export interface NftListElementProps {
  name: string;
  image?: string;
  network: string;
  networkLogo?: string;
  id: string;
  contract: string;
  network_id: string;
  token_id: number;
  hidden: boolean;
  switchHidden?(token_id: number, hidden: boolean): void;
  onElementPress?(id: string, contract: string, network: string): void;
}

function NftListElement({
  name,
  image,
  network,
  onElementPress,
  networkLogo,
  id,
  contract,
  network_id,
  hidden,
  switchHidden,
  token_id,
}: NftListElementProps) {
  const {t} = useTranslation();
  const onPress = useCallback(() => {
    onElementPress?.(id, contract, network_id);
  }, [onElementPress, id, contract, network_id]);

  const onToggleHide = useCallback(() => {
    switchHidden?.(token_id, hidden);
  }, [token_id, switchHidden, hidden]);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <NftImage image={image} imageStyle={styles.image} placeHolderContainerStyle={styles.spinnerContainer} />
      <View style={styles.columns}>
        <View style={styles.column}>
          <View style={styles.nameRow}>
            <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
              {name}
            </Text>
          </View>
          <View style={styles.networkRow}>
            <Image source={getImageSource(networkLogo, coinPlaceholder)} style={styles.networkLogo} />
            <Text style={styles.networkLabel}>{`${t('nftBlockchain')}:`}</Text>
            <Text style={styles.network}>{network}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.hideShowColumn} onPress={onToggleHide}>
          <Text style={styles.hideShow}>{hidden ? t('nftShow') : t('nftHide')}</Text>
          <Image source={hidden ? hide : show} style={styles.hideShowIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(NftListElement);

const styles = StyleSheet.create({
  container: {
    width: Layout.isSmallDevice ? 288 : 340,
    height: Layout.isSmallDevice ? 340 : 405,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    marginBottom: 10,
    paddingTop: Layout.isSmallDevice ? 16 : 20,
    paddingBottom: Layout.isSmallDevice ? 16 : 20,
    paddingLeft: Layout.isSmallDevice ? 16 : 20,
    paddingRight: Layout.isSmallDevice ? 16 : 20,
    backgroundColor: theme.colors.grayDark,
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 13,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '75%',
    marginRight: 5,
  },
  hideShowColumn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingTop: Layout.isSmallDevice ? 18 : 26,
    height: '100%',
    // flexGrow: 0,
    // flex: 0,
    // flexShrink: 0,
    // flexBasis: '25%',
  },
  image: {
    width: Layout.isSmallDevice ? 256 : 300,
    height: Layout.isSmallDevice ? 256 : 300,
    borderRadius: 12,
  },
  nameRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hideShow: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.textLightGray,
  },
  hideShowIcon: {
    width: 18.5,
    height: 14.6,
    marginLeft: 13,
  },
  name: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 15 : 18,
    lineHeight: Layout.isSmallDevice ? 21 : 28,
    color: theme.colors.white,
    width: '100%',
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkLabel: {
    marginRight: 4,
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 12 : 13,
    lineHeight: Layout.isSmallDevice ? 14 : 15,
    color: theme.colors.textLightGray,
  },
  network: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 12 : 13,
    lineHeight: Layout.isSmallDevice ? 14 : 15,
    color: theme.colors.white,
  },
  networkLogo: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  spinnerContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: Layout.isSmallDevice ? 256 : 300,
    width: Layout.isSmallDevice ? 256 : 300,
  },
});
