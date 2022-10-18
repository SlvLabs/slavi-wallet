import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Movements} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../custom-icon/custom-icon';
import {MovementElement} from './movement-element';
import {Type} from '../operations/operation-amount';
import {nftArrow} from '../../assets/images';
import Layout from '../../utils/layout';
import theme from '../../theme';

export interface MovementsOperationProps {
  from: Movements[];
  to: Movements[];
  ticker: string;
}

export function MovementsOperation({from, to, ticker}: MovementsOperationProps) {
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
          <View style={styles.fromContainer}>
            {from.map((movement) => (
              <MovementElement
                label={t('detailsFrom')}
                address={movement.address}
                amount={movement.amount}
                type={Type.negative}
                ticker={ticker}
              />
            ))}
          </View>
          <View style={styles.delimiterRow}>
            <View style={styles.delimiter}/>
            <Image source={nftArrow} style={styles.delimiterImage}/>
            <View style={styles.delimiter}/>
          </View>
          <View style={styles.toContainer}>
            {to.map((movement, index) => (
              <MovementElement
                label={t('detailsTo')}
                address={movement.address}
                amount={movement.amount}
                type={Type.positive}
                ticker={ticker}
                key={`movement_${index}`}
              />
            ))}
          </View>
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
  fromContainer: {},
  toContainer: {},
  delimiterRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.isSmallDevice ? 12 : 18,
    marginTop: Layout.isSmallDevice ? 12 : 18,
  },
  delimiter: {
    width: Layout.window.width/2 - 80,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
    marginRight: 10,
    marginLeft: 10,
  },
  delimiterImage: {
    width: 19,
    height: 19,
  }
});
