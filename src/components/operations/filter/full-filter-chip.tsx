import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import useTranslation, {TranslationsKey} from '../../../utils/use-translation';

export interface FullFilterChipProps {
  title: TranslationsKey;
  selected: boolean;
  onPress: () => void;
}

const FullFilterChip = (props: FullFilterChipProps) => {
  const {t} = useTranslation();

  const title = useMemo(() => t(props.title), [props.title, t]);

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      {props.selected ? (
        <LinearGradient {...theme.gradients.button} style={styles.contentContainer}>
          <Text style={{...styles.title, ...styles.activeTitle}}>{title}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 8,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.01,
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    color: theme.colors.textLightGray3,
  },
  activeTitle: {
    color: theme.colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: theme.colors.cardBackground3,
  },
});

export default FullFilterChip;
