import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import theme from '../../theme';
import React from 'react';
import {useTranslation} from 'react-i18next';

const SimpleErrorBoundary = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          name={'error-outline'}
          type={'material'}
          color={theme.colorsOld.pink}
          size={150}
        />
      </View>
      <Text style={styles.title}>{t('Ooops... Something went wrong')}</Text>
      <Text style={styles.description}>
        {t(
          'Please try restart application. The developers will be grateful if you report this error to support support@slavicoin.io',
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 16,
  },
  icon: {
    marginTop: 50,
    margin: 20,
    flex: 3,
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.2,
    flex: 1,
  },
  description: {
    flexDirection: 'row',
    textAlign: 'center',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 22,
    color: theme.colorsOld.lightGray,
    flex: 4,
  },
});

export default SimpleErrorBoundary;
