import BaseAuthedModal from '../modal/base-authorized-modal';
import {StyleSheet, Switch, Text, View} from 'react-native';
import theme from '../../theme';
import React, {useCallback, useReducer, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import NftFilterBlockchainRow, {HiddenNftNetwork} from './nft-filter-blockchain-row';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';

export interface NftFilterModalProps {
  visible: boolean;
  onCancel(): void;
  networks: {
    id: string;
    name: string;
    logo?: string;
    shown: boolean;
  }[];
  showHiddenTokens: boolean;
  setShowHiddenTokens(value: boolean): void;
  update(values: {networks: HiddenNftNetwork[]; showHiddenTokens: boolean}): void;
  updateLoading: boolean;
}

function networksReducer(networks: HiddenNftNetwork[], action: {id: string}) {
  return networks.map(n =>
    n.id === action.id
      ? {
          ...n,
          shown: !n.shown,
        }
      : n,
  );
}

export default function NftFilterModal({
  visible,
  onCancel,
  networks: initNetworks,
  showHiddenTokens: init_showHiddenTokens,
  update,
  updateLoading,
}: NftFilterModalProps) {
  const {t} = useTranslation();

  const [networks, toggleNetwork] = useReducer(
    networksReducer,
    initNetworks.map(n => ({...n})),
  );
  const [showHiddenTokens, setShowHiddenTokens] = useState(init_showHiddenTokens);

  const submit = useCallback(() => {
    update({
      showHiddenTokens: showHiddenTokens,
      networks: networks,
    });
  }, [update, showHiddenTokens, networks]);

  const toggleNetworkHide = useCallback((id: string) => {
    toggleNetwork({id});
  }, []);

  return (
    <BaseAuthedModal visible={visible} onCancel={onCancel}>
      <View style={styles.networksContainer}>
        <Text style={styles.header}>{t('nftSelectBlockchain')}</Text>
        <View style={styles.networkList}>
          {networks.map(n => (
            <NftFilterBlockchainRow
              key={n.id}
              id={n.id}
              logo={n.logo}
              name={n.name}
              shown={n.shown}
              toggleNetworkHide={toggleNetworkHide}
            />
          ))}
        </View>
        <Text style={{...styles.header, ...styles.header2}}>{t('hiddenNFTs')}</Text>
        <View style={styles.checkboxWrap}>
          <Text style={styles.checkboxText}>{t('nftShowHiddenTokens')}</Text>
          <View style={styles.checkboxSwitchWrap}>
            <Switch
              value={showHiddenTokens}
              onValueChange={setShowHiddenTokens}
              thumbColor={theme.colors.white}
              trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
            />
          </View>
        </View>
        <SolidButton title={t('apply')} containerStyle={styles.btn1} onPress={submit} loading={updateLoading} />
        <OutlineButton title={t('Cancel')} onPress={onCancel} />
      </View>
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    color: theme.colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
    paddingBottom: 20,
  },
  header2: {
    marginTop: 32,
  },
  networksContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  networkList: {},
  checkboxWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  checkboxSwitchWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.white,
  },
  btn1: {
    marginTop: 28,
    marginBottom: 12,
  },
});
