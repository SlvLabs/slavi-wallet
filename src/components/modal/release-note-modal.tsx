import React, {useMemo} from 'react';
import BaseModal from './base-modal';
import {Image, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {releaseNoteLogo} from '../../assets/images';
import useTranslation, {TranslationsKey} from '../../utils/use-translation';
import {getAppVersion} from '../../utils/get-app-version';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import Layout from '../../utils/layout';
import {useReleaseNotes} from '@slavi/wallet-core/src/hooks/use-release-notes';

const MAX_RELEASE_NOTES_COUNT = 30;

function ReleaseNoteEntity({text}: {text: string}) {
  return (
    <View style={styles.noteEntity}>
      <CustomIcon name={'check'} size={16} color={theme.colors.violet2} style={styles.icon} />
      <Text style={styles.noteText}>{text}</Text>
    </View>
  );
}

export function ReleaseNoteModal() {
  const {t} = useTranslation();

  const version = useMemo(getAppVersion, []);

  const notes = useMemo(() => {
    const result = [];

    for (let i = 0; i < MAX_RELEASE_NOTES_COUNT; i++) {
      const key = `releaseNotes_${Platform.OS}_${version}_${i}`;
      const text = t(key as TranslationsKey);
      if (!text || text === key) {
        continue;
      }

      result.push(text);
    }

    return result;
  }, [t, version]);

  const {needShow, onClose} = useReleaseNotes(version);

  return (
    <BaseModal visible={notes.length > 0 && needShow} showCloseIcon={true} onCancel={onClose}>
      <View style={styles.content}>
        <Image source={releaseNoteLogo} width={72} height={72} style={styles.image} />
        <Text style={styles.header}>{t('releaseNotesHeader', {version: version})}</Text>
        <ScrollView style={styles.scroll} horizontal={false}>
          {notes.map((note, i) => (
            <ReleaseNoteEntity text={note} key={i}/>
          ))}
        </ScrollView>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: Layout.isSmallDevice ? 64 : 72,
    height: Layout.isSmallDevice ? 64 : 72,
    marginTop: 8,
    marginBottom: 24,
  },
  header: {
    color: theme.colors.white,
    fontFamily: theme.fonts.gilroy,
    fontSize: Layout.isSmallDevice ? 15 : 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 25,
    marginBottom: 24,
  },
  scroll: {
    height: Layout.window.height - 400,
  },
  noteEntity: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  noteText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.default,
    fontSize: Layout.isSmallDevice ? 13 : 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    marginLeft: 8,
    width: Layout.isSmallDevice ? 224 : 275,
  },
  icon: {
    padding: 4,
  },
});
