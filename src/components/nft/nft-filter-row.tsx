import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import Layout from '../../utils/layout';
import {filter} from '../../assets/images';
import NftFilterModal from './nft-filter-modal';
import type {HiddenNftNetwork} from './nft-filter-blockchain-row';

export interface NftFilterRowProps {
  showed: number;
  networks: HiddenNftNetwork[];
  showHiddenTokens: boolean;
  setShowHiddenTokens(value: boolean): void;
  update(values: {networks: HiddenNftNetwork[]; showHiddenTokens: boolean}): void;
  updateLoading: boolean;
}
function NftFilterRow({
  showed,
  networks,
  setShowHiddenTokens,
  showHiddenTokens,
  update,
  updateLoading,
}: NftFilterRowProps) {
  const {t} = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const hiddenNetworkCount = networks.filter(n => !n.shown).length;

  return (
    <View style={styles.container}>
      <View style={styles.showedContainer}>
        <Text style={styles.showedLabel}>{`${t('nftShowed')}:`}</Text>
        <Text style={styles.showedNumber}>{showed}</Text>
      </View>
      <TouchableOpacity style={styles.filterContainer} onPress={openModal}>
        <Text style={styles.filterLabel}>{t('nftFilter')}</Text>
        <Image source={filter} style={styles.filterIcon} />
        {!!hiddenNetworkCount && (
          <Text style={styles.hiddenCount}>
            <Text style={styles.hiddenCountText}>{hiddenNetworkCount}</Text>
          </Text>
        )}
      </TouchableOpacity>
      {modalOpen && (
        <NftFilterModal
          visible={modalOpen}
          networks={networks}
          setShowHiddenTokens={setShowHiddenTokens}
          showHiddenTokens={showHiddenTokens}
          onCancel={closeModal}
          update={update}
          updateLoading={updateLoading}
        />
      )}
    </View>
  );
}

export default React.memo(NftFilterRow);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Layout.isSmallDevice ? 288 : 340,
    paddingBottom: 12,
  },
  showedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenCount: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: theme.colors.borderGreen,
    borderRadius: 15,
    width: 16,
    height: 16,
    paddingTop: 6,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 3,
  },
  hiddenCountText: {
    lineHeight: 8,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: theme.fonts.gilroy,
    color: theme.colors.black,
  },
  showedLabel: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.textLightGray,
  },
  showedNumber: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.white,
    marginLeft: 10,
  },
  filterLabel: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.white,
  },
  filterIcon: {
    marginLeft: 10,
    width: 32,
    height: 32,
  },
});
