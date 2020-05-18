import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../theme';

export interface CoinTabsHeaderProps {
  tabs: Record<number, string>;
  activeTab: number;
  onTabChange: (index: number) => void;
}

const CoinTabsHeader = (props: CoinTabsHeaderProps) => {
  return (
    <View style={styles.container}>
      {Object.entries(props.tabs).map(([key, value], index) => {
        let style = styles.header;
        let textStyle = styles.text;
        if (+key === props.activeTab) {
          style = {...style, ...styles.activeHeader};
          textStyle = {...textStyle, ...styles.activeText};
        }
        return (
          <TouchableOpacity
            key={`tab_header_${index}`}
            style={style}
            onPress={() => props.onTabChange(+key)}>
            <Text style={textStyle}>{value}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  activeHeader: {
    borderBottomColor: theme.colorsOld.pink,
    borderBottomWidth: 2,
  },
  header: {
    marginRight: 16,
    paddingBottom: 4,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    color: theme.colorsOld.lightGray,
  },
  activeText: {
    color: theme.colorsOld.gray,
  },
});

export default CoinTabsHeader;
