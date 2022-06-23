import {ActivityIndicator, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import useLanguages from '@slavi/wallet-core/src/providers/ws/hooks/use-languages';
import useTranslation from '../../utils/use-translation';
import SelectableList from '../../components/controls/selectable-list';
import mapArrayToSelectOptions from '../../utils/map-array-to-select-options';
import useLanguageService from '@slavi/wallet-core/src/contexts/hooks/use-language-service';
import objectMap from '@slavi/wallet-core/src/utils/object-map';
import Screen from '../../components/screen';

const LanguageScreen = () => {
  const {languages, isLoading} = useLanguages();
  const {i18n} = useTranslation();
  const languageService = useLanguageService();

  const {t} = useTranslation();

  const onChange = useCallback(
    async (value: string) => {
      await languageService.setCurrentLanguage(value);
      await i18n.changeLanguage(value);
    },[i18n, languageService]
  );

  const languageOptions: Record<string, string> | undefined = useMemo(
    () => objectMap(mapArrayToSelectOptions(languages), (lang) => t(lang)), [languages]
  );

  if (isLoading || !languages) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Screen title={t('Language')} headerContainerStyle={{paddingLeft: 0}}>
      <SelectableList onSelect={onChange} options={languageOptions} current={i18n.language}/>
    </Screen>
  );
};

export default LanguageScreen;
