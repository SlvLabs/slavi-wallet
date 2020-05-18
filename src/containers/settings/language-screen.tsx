import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import useLanguages from '@slavi/wallet-core/src/providers/ws/hooks/use-languages';
import {Picker} from '@react-native-community/picker';
import {useTranslation} from 'react-i18next';

const LanguageScreen = () => {
  const {languages, isLoading} = useLanguages();
  const {i18n} = useTranslation();
  const [lang, setLang] = useState<string>(i18n.language);

  const onChange = useCallback(
    (value: string) => {
      setLang(value);
      i18n.changeLanguage(value);
    },
    [i18n],
  );

  if (isLoading || !languages) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Picker
        selectedValue={lang}
        onValueChange={itemValue => onChange(itemValue as string)}>
        {languages.map(_lang => (
          <Picker.Item label={_lang} value={_lang} key={_lang} />
        ))}
      </Picker>
    </SafeAreaView>
  );
};

export default LanguageScreen;
