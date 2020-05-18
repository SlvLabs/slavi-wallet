import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';

export interface OperationParticipantsProps {
  participants?: string[];
  containerStyle?: ViewStyle;
  participantStyle?: TextStyle;
  additionalStyle?: TextStyle;
}

const OperationParticipants = (props: OperationParticipantsProps) => {
  const {t} = useTranslation();
  let firstParticipant = t('Unknown participants');
  let additionalParticipants = 0;

  if (Array.isArray(props.participants) && props.participants.length > 0) {
    firstParticipant = props.participants[0];
    additionalParticipants = props.participants.length - 1;
  }

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
      {additionalParticipants > 0 && (
        <Text
          style={{...styles.additionalParticipants, ...props.additionalStyle}}>
          {`(+${additionalParticipants}...)`}
        </Text>
      )}
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
    fontWeight: 'bold',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 12,
    color: theme.colorsOld.gray,
    width: 150,
  },
  additionalParticipants: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 12,
    color: theme.colorsOld.darkGray,
  },
});

export default OperationParticipants;
