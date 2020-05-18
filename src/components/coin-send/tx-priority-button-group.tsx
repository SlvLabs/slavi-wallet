import React, {useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import SolidButton from '../buttons/solid-button';
import Button from '../buttons/button';
import theme from '../../theme';

export interface TxPriorityButtonGroupProps {
  selectedIndex?: number;
  onSelected: (index: number) => void;
  label?: string;
  advancedIsAllowed?: boolean;
  onAdvancedPress?: () => void;
  cardStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  buttonsContainerStyle?: ViewStyle;
}

const TxPriorityButtonGroup = (props: TxPriorityButtonGroupProps) => {
  const {t} = useTranslation();
  const buttons = [t('Slow'), t('Average'), t('Fast')];
  const selectedIndex = props.selectedIndex || 0;

  const renderButton = useCallback(
    (title: string, index: number) => {
      const key = `priority_${index}`;
      if (index === selectedIndex) {
        return (
          <SolidButton
            title={title}
            buttonStyle={styles.button}
            onPress={() => props.onSelected(index)}
            key={key}
          />
        );
      }

      return (
        <Button
          title={title}
          buttonStyle={styles.button}
          onPress={() => props.onSelected(index)}
          key={key}
        />
      );
    },
    [selectedIndex, props],
  );

  return (
    <View style={{...styles.card, ...props.cardStyle}}>
      <View style={{...styles.header, ...props.headerStyle}}>
        <Text style={{...styles.label, ...props.labelStyle}}>
          {props.label}
        </Text>
        {props.advancedIsAllowed && (
          <TouchableOpacity
            onPress={props.onAdvancedPress}
            style={styles.advancedContainer}>
            <Icon
              name={'settings'}
              type={'feather'}
              size={12}
              color={theme.colorsOld.pink}
              style={styles.advancedIcon}
            />
            <Text style={styles.advancedLabel}>{t('Advanced')}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{...styles.buttonContainer, ...props.buttonsContainerStyle}}>
        {buttons.map(renderButton)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingTop: 8,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.2,
    color: theme.colorsOld.lightGray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    width: 88,
    height: 36,
    marginRight: 8,
  },
  advancedContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  advancedLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: theme.colorsOld.pink,
  },
  advancedIcon: {
    marginRight: 4,
  },
});

export default TxPriorityButtonGroup;
