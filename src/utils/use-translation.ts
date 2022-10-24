import {i18n} from 'i18next';
import {useTranslation as originalUseTranslation} from 'react-i18next';
import translations from '../assets/translations/fallback';

export type TranslationsKey = keyof typeof translations;

export type CustomTranslateFunction = (k: TranslationsKey, options?: {[key: string]: any}) => string;

export default function useTranslation(): {i18n: i18n; t: CustomTranslateFunction} {
  return originalUseTranslation();
}
