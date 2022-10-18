import {NftMovements} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import theme from '../../theme';
import Layout from '../../utils/layout';
import CustomIcon from '../custom-icon/custom-icon';
import NftImage from '../nft/nft-image';
import {RowOperation} from './row-operation';
import {AddressOperation} from './address-operation';
import useTranslation from '../../utils/use-translation';

export interface NftMovementElementProps {
  movement: NftMovements;
}

export function NftMovementElement({movement}: NftMovementElementProps) {
  const [opened, setOpened] = useState<boolean>(false);

  const {t} = useTranslation();

  const onPress = () => setOpened(!opened);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.headerRow}>
        <CustomIcon
          name={'arrow'}
          size={22}
          style={opened ? styles.activeButtonIcon : styles.buttonIcon}
          color={theme.colors.textLightGray3}
        />
        <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>{movement.name}</Text>
        <View style={styles.token}>
          <Text style={styles.amount}>{`${movement.amount} NFT`}</Text>
        </View>
      </View>
      {opened && (
        <View style={styles.body}>
          <NftImage
            image={movement?.image}
            imageStyle={styles.image}
            placeHolderContainerStyle={styles.image}
          />
          {!!movement?.fromAddress && <RowOperation label={t('detailsSentFrom')} content={<AddressOperation address={movement?.fromAddress}/>}/>}
          {!!movement?.toAddress && <RowOperation label={t('detailsReceivedTo')} content={<AddressOperation address={movement?.toAddress}/>} isLast={true}/>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
    width: Layout.isSmallDevice ? 147 : 160,
  },
  token: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: theme.colors.simpleCoinBackground,
    marginLeft: 16,
    borderRadius: 30,
  },
  amount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
    textTransform: 'uppercase',
  },
  buttonIcon: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
    marginRight: 16,
  },
  activeButtonIcon: {
    transform: [
      {
        rotate: '270deg',
      },
    ],
    marginRight: 16,
  },
  body: {
    alignItems: 'center',
  },
  image: {
    marginTop: 19,
    width: Layout.isSmallDevice ? 160 : 191,
    height: Layout.isSmallDevice ? 160 : 191,
    marginBottom: 14,
  },
});
