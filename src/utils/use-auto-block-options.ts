import {useMemo} from 'react';
import useTranslation from './use-translation';

export default function useAutoBlockOptions(): Record<string, string> {
  const {t} = useTranslation();

  return useMemo(() => ({
    '0': t('immediately'),
    '60000': t('oneMinute'),
    '300000': t('fiveMinutes'),
    '3600000': t('oneHour'),
    '18000000': t('fiveHour'),
  }), [t]);
}
