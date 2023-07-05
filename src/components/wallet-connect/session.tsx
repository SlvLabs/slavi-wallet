import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../theme';

export interface SessionProps {
  peerName: string;
  peerUrl?: string;
  icon?: string;
  onPress?: () => void;
}

export default function Session(props: SessionProps) {
  const {peerName, peerUrl, icon, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftColumn}>
        <View style={styles.imageContainer}>{!!icon && <Image source={{uri: icon}} style={styles.image} />}</View>
        <View style={styles.textBlock}>
          <Text style={styles.name}>{peerName}</Text>
          {!!peerUrl && <Text style={styles.url}>{peerUrl}</Text>}
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon
          name={'chevron-right'}
          type={'feather'}
          size={22}
          color={theme.colors.textLightGray}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: theme.colors.borderGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textBlock: {},
  name: {
    fontFamily: theme.fonts.default,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 22,
    color: theme.colors.white,
  },
  url: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.textLightGray1,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  icon: {},
  leftColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 5,
  },
  imageContainer: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  iconContainer: {
    flex: 1,
  },
});
