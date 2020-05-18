import React, {useCallback} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {CoinListElement} from '@slavi/wallet-core/src/providers/ws/hooks/use-coin-info';
import TextWithLabel from './info-elements/text-with-label';
import IconTextWithLabel from './info-elements/icon-text-with-label';

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
      {props.info?.data?.title && (
        <View style={styles.titleContainer}>
          <Text style={{...styles.title, ...props.titleStyle}}>
            {props.info?.data?.title}
          </Text>
        </View>
      )}
      <View style={styles.contentContainer}>{renderContent(props.info)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  titleContainer: {},
  contentContainer: {},
});

export default CoinInfoElement;
