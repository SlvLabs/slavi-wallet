import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';

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
          textStyle = {...textStyle, ...styles.activeText};
        }
        return (
          <TouchableOpacity
            key={`tab_header_${index}`}
            style={style}
            onPress={() => props.onTabChange(+key)}>
            {+key === props.activeTab ? (
              <LinearGradient useAngle={false} colors={['rgba(116, 122, 142, 0.2)', 'rgba(35, 38, 48, 0.2)', '#2D303E']}  locations={[0, 1, 1]} style={styles.headerContainer}>
                <Text style={textStyle}>{value}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.headerContainer}>
                <Text style={textStyle}>{value}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.mediumBackground,
    padding: 8,
    borderRadius: 8,
  },
  header: {
    flex: 1,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.01,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  activeText: {
    color: theme.colors.white,
  },
  headerContainer: {
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16,
  }
});

export default CoinTabsHeader;
