import React, {useState} from 'react';
import useTranslation from '../../utils/use-translation';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import { NftMovements } from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import {NftMovementElement} from './nft-movement-element';

export interface NftMovementsOperationProps {
  operations: NftMovements[];
}

export function NftMovementsOperation({operations}: NftMovementsOperationProps) {
  const [opened, setOpened] = useState<boolean>(false);

  const {t} = useTranslation();

  const onPress = () => setOpened(!opened);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.button, ...(opened ? styles.activeButton : {})}} onPress={onPress}>
        <Text style={styles.buttonTitle}>{t('detailsMoreData')}</Text>
        <CustomIcon
          name={'arrow'}
          size={22}
          style={opened ? styles.activeButtonIcon : styles.buttonIcon}
          color={theme.colors.textLightGray3}
        />
      </TouchableOpacity>
      {opened && (
        <View style={styles.collapse}>
          {operations.map((movement, index) => (
            <NftMovementElement movement={movement} key={`movement_${index}`}/>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
    flexDirection: 'row',
    backgroundColor: theme.colors.simpleCoinBackground,
    marginTop: 42,
    marginBottom: 16,
  },
  activeButton: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: theme.colors.buttonBorder,
    borderWidth: 1,
  },
  collapse: {},
  buttonTitle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    color: theme.colors.white,
  },
  buttonIcon: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
    marginLeft: 12,
  },
  activeButtonIcon: {
    transform: [
      {
        rotate: '270deg',
      },
    ],
    marginLeft: 12,
  },
});
