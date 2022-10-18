import React, {ReactNode, useCallback} from 'react';
import {Linking, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../theme';
import OutlineButton from '../buttons/outline-button';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../custom-icon/custom-icon';

export interface ContainerOperationProps {
  children: ReactNode;
  explorerLink?: string;
  containerStyle?: ViewStyle;
}

export function ContainerOperation({children, explorerLink, containerStyle}: ContainerOperationProps) {
  const {t} = useTranslation();

  const onButtonPress = useCallback(() => {
    if(explorerLink) {
      Linking.openURL(explorerLink).catch(e => console.error(e));
    }
  }, [explorerLink]);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.content}>
        {children}
      </View>
      {!!explorerLink && (
        <OutlineButton
          onPress={onButtonPress}
          title={t('openExplorer')}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          iconRight={true}
          icon={<CustomIcon color={theme.colors.borderGreen} name={'arrow-up1'} size={16} style={styles.icon}/>}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.borderGray,
    padding: 24,
    marginBottom: 16,
  },
  content: {},
  button: {
    borderColor: theme.colors.borderGreen,
    marginTop: 32,
    marginBottom: 24,
  },
  buttonTitle: {
    color: theme.colors.borderGreen,
  },
  icon: {
    transform: [{
      rotate: '90deg',
    }],
    marginLeft: 12,
  }
});
