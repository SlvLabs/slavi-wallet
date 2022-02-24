import React, {useCallback} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {CoinListElement} from '@slavi/wallet-core/src/providers/ws/hooks/use-coin-info';
import TextWithLabel from './info-elements/text-with-label';
import IconTextWithLabel from './info-elements/icon-text-with-label';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface CoinInfoElementProps {
  info: CoinListElement;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

enum Types {
  textWithLabel = 'text_with_label',
  iconTextWithLabel = 'icon_text_with_label',
}

const CoinInfoElement = (props: CoinInfoElementProps) => {
  const renderContent = useCallback((data: any) => {
    if (!data || !data.type) {
      return;
    }

    switch (data.type) {
      case Types.textWithLabel:
        return <TextWithLabel label={data.data.label} text={data.data.text} />;
      case Types.iconTextWithLabel:
        return (
          <IconTextWithLabel
            label={data.data.label}
            text={data.data.text}
            icon={data.data.icon}
          />
        );
      default:
        return;
    }
  }, []);

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      {renderContent(props.info)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: 8,
    marginTop: Layout.isSmallDevice ? 3 : 8,
    marginBottom: Layout.isSmallDevice ? 3 : 8,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 13,
    paddingBottom: 13,
  },
  title: {},
  titleContainer: {},
  contentContainer: {},
});

export default CoinInfoElement;
