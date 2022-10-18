import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';

export interface OperationParticipantsProps {
  participant?: string;
  containerStyle?: ViewStyle;
  participantStyle?: TextStyle;
  additionalStyle?: TextStyle;
}

const OperationParticipants = (props: OperationParticipantsProps) => {
  const {t} = useTranslation();
  let firstParticipant = props.participant || t('Unknown participants');

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.participantContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{...styles.participant, ...props.additionalStyle}}>
          {firstParticipant}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  participantContainer: {},
  participant: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
    width: 160,
  },
});

export default OperationParticipants;
