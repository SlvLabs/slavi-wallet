import {AbstractRuleDisplayInfoPosition} from '@slavi/wallet-core/src/providers/ws/messages/refferal';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import useTranslation from '../../utils/use-translation';
import {RulePosition} from './rule-position';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

export interface RuleProps {
  title: string;
  maxAmount?: number;
  amount?: number;
  percent?: number;
  maxPercent?: number;
  description: string;
  positions: AbstractRuleDisplayInfoPosition[];
}

export function Rule({title, maxAmount, amount, percent, maxPercent, description, positions}: RuleProps) {
  const [opened, setOpened] = useState(false);

  const {t} = useTranslation();

  const headerValue = useMemo(() => {
    if (maxAmount) {
      return t('referralRuleUpToAmount', {amount: maxAmount});
    } else if (amount) {
      return t('referralRuleAmount', {amount: amount});
    } else if (maxPercent) {
      return t('referralRuleUpToPercent', {percent: maxPercent});
    } else if (percent) {
      return t('referralRulePercent', {percent: percent});
    } else {
      return '';
    }
  }, [amount, maxAmount, maxPercent, percent, t]);

  const onPress = useCallback(() => setOpened(p => !p), []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightHeader}>
          <Text style={styles.headerValue}>{headerValue}</Text>
          <CustomIcon
            name={'arrow'}
            size={20}
            color={theme.colors.textLightGray3}
            style={opened ? styles.openedIcon : styles.closedIcon}
          />
        </View>
      </View>
      {opened && (
        <View style={styles.body}>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.positions}>
            {positions.map((position, i) => (
              <RulePosition
                label={position.condition.text}
                translate={position.condition.translate}
                isLast={i === positions.length - 1}
                percent={position.reward.percent}
                amount={position.reward.amount}
                key={`position_${i}`}
              />
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    padding: 16,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.textLightGray,
  },
  body: {
    paddingTop: 21,
  },
  description: {
    fontFamily: theme.fonts.default,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
    color: theme.colors.textLightGray,
  },
  positions: {
    paddingTop: 16,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerValue: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.gold2,
    marginRight: 16,
  },
  closedIcon: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  openedIcon: {
    transform: [
      {
        rotate: '-90deg',
      },
    ],
  },
});
