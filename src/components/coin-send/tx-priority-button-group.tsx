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
import useTranslation from '../../utils/use-translation';
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
            containerStyle={styles.buttonContainer}
            titleStyle={styles.inactiveButtonTitle}
            onPress={() => props.onSelected(index)}
            key={key}
          />
        );
      }

      return (
        <Button
          title={title}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
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
              color={theme.colors.darkGreen1}
              style={styles.advancedIcon}
            />
            <Text style={styles.advancedLabel}>{t('Advanced')}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{...styles.buttonsContainer, ...props.buttonsContainerStyle}}>
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
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.01,
    color: theme.colors.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    width: 94,
    height: 48,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.cardBackground3,
  },
  buttonTitle: {
    color: theme.colors.textLightGray,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    textTransform: 'uppercase',
  },
  inactiveButtonTitle: {
    color: theme.colors.white,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    borderRadius: 8,
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
    color: theme.colors.darkGreen1,
  },
  advancedIcon: {
    marginRight: 4,
  },
});

export default TxPriorityButtonGroup;
