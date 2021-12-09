import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import theme from '../../theme';
import {simpleLogo} from '../../assets/images';
import {useTranslation} from 'react-i18next';
import SolidButton from '../../components/buttons/solid-button';
import SimpleSelect from '../../components/controls/simple-select';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import InitializationBackground from '../../components/background/initialization-background';
import useLanguages from '@slavi/wallet-core/src/providers/ws/hooks/use-languages';
import {useFiatSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import {useCurrencyLists, useCurrencyService} from '@slavi/wallet-core';
import useLanguageService from '@slavi/wallet-core/src/contexts/hooks/use-language-service';
import mapArrayToSelectOptions from '../../utils/map-array-to-select-options';
import Layout from '../../utils/layout';

const InitializeLocalizationScreen = () => {
  const {languages, isLoading: isLoadingLanguages} = useLanguages();
  const {fiatList, isLoading: isLoadingCurrency} = useCurrencyLists();
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const startCurrency = useFiatSelector();
  const languageService = useLanguageService();
  const currencyService = useCurrencyService();

  const [lang, setLang] = useState<string>(i18n.language);
  const [currency, setCurrency] = useState<string>(startCurrency || 'USD')

  const onLanguageSelect = useCallback(async (value: string) => {
    setLang(value);
    await languageService.setCurrentLanguage(value);
    return i18n.changeLanguage(value);
  }, [i18n, languageService]);

  const onCurrencySelect = useCallback(async (value: string) => {
    setCurrency(value);
    return currencyService.setFiat(value);
  }, []);

  const goNextStep = useCallback(() => navigation.navigate(ROUTES.INITIALIZATION.LICENSE_AGREEMENT), []);

  const languageOptions: Record<string, string> | undefined = useMemo(
    () => mapArrayToSelectOptions(languages), [languages]
  );

  const currencyOptions: Record<string, string> | undefined = useMemo(
    () => mapArrayToSelectOptions(fiatList), [fiatList]
   );

  return (
    <InitializationBackground>
        <View style={styles.logoView}>
          <Image source={simpleLogo} style={styles.logo} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.header}>{t('Сonvenient system')}</Text>
          <Text style={styles.description}>
            {t('We offer you a convenient system that’ll help solve all your problems with cryptocurrency')}
          </Text>
        </View>
        <View style={styles.formBlock}>
          <SimpleSelect
            onSelect={onLanguageSelect}
            value={lang}
            options={languageOptions}
            label={t('Language')}
            isLoading={isLoadingLanguages}
          />
          <SimpleSelect
            onSelect={onCurrencySelect}
            value={currency}
            options={currencyOptions}
            label={t('Currency')}
            isLoading={isLoadingCurrency}
          />
        </View>
        <View style={styles.buttonsView}>
          <SolidButton title={t('Continue')} onPress={goNextStep}/>
          <View style={styles.loaderView}>
            <PointerProgressBar stepsCount={5} activeStep={0}/>
          </View>
        </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: Layout.isSmallDevice ? 1 : 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: Layout.isSmallDevice ? 100 : 160,
    height: Layout.isSmallDevice ? 100 : 160,
    marginBottom: 10,
  },
  textBlock: {
    marginBottom: 30,
    flex: 1,
  },
  header: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.colors.white,
    marginBottom: 10,
  },
  description: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  formBlock: {
    flex: 2,
    justifyContent: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.dark1,
  },
  buttonsView: {
    marginTop: 16,
    justifyContent: 'flex-end',
    flex: 1,
  },
  loaderView: {
    paddingTop: 17,
  }
});

export default InitializeLocalizationScreen;
