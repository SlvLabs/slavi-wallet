import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CoinListElement} from '@slavi/wallet-core/src/providers/ws/hooks/use-coin-info';
import CoinInfoElement from '../coin-info-element';
import MainLink from '../main-link';
import theme from '../../../theme';

export interface MainLinkData {
  icon: string;
  text: string;
  link: string;
}

export interface CoinParams {
  description: string;
  mainLinks: MainLinkData[];
}

export interface InfoViewProps {
  params: CoinListElement[];
  fiat: string;
  crypto: string;
  isLoading: boolean;
  coinParams?: CoinParams;
}

const InfoView = (props: InfoViewProps) => {
  return (
    <View style={styles.container}>
      {props.isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {!!props?.coinParams?.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                {props.coinParams.description}
              </Text>
            </View>
          )}
          {!!props?.coinParams?.mainLinks && (
            <View style={styles.mainListLinks}>
              {props.coinParams.mainLinks.map((element, index: number) => {
                return (
                  <MainLink
                    text={element.text}
                    icon={element.icon}
                    link={element.link}
                    key={`coin_param_${index}`}
                  />
                );
              })}
            </View>
          )}
          <View style={styles.infoParamsList}>
            {props.params.map((element, index) => {
              return (
                <CoinInfoElement info={element} key={`coin_info_${index}`} />
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  mainListLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoParamsList: {},
  descriptionContainer: {
    margin: 24,
  },
  description: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.white,
    opacity: 0.7,
    textAlign: 'left',
  },
});

export default InfoView;
