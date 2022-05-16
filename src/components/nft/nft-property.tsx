import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../theme';

export interface NftPropertyProps {
  title: string;
  mainText: string;
  additionalText?: string;
}

export default function NftProperty(props: NftPropertyProps) {
  const {title, mainText, additionalText} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.mainText}>{mainText}</Text>
      {!!additionalText && <Text style={styles.additionalText}>{additionalText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground2,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  header: {
    textTransform: 'uppercase',
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.gold2,
    marginBottom: 8,
  },
  mainText: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.white,
    marginBottom: 8,
  },
  additionalText: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.textLightGray1,
  },
});
