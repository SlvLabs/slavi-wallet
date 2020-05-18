import {OperationSections} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {SectionList, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import OperationHeader from './operation-header';
import OperationElement from './operation-element';
import {
  Operation,
  OperationListParams,
} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {Icon} from 'react-native-elements';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';
import OperationListFilter from './filter/operation-list-filter';

export interface OperationsListProps {
  sections: OperationSections;
  fiatTicker: string;
  cryptoTicker: string;
  onEndReached: () => void;
  filter: (params: OperationListParams) => void;
  containerStyle?: ViewStyle;
}

interface Section {
  title: Date;
  data: Operation[];
}

const OperationsList = (props: OperationsListProps) => {
  const sections = useMemo(() => {
    return Object.values(props.sections)
      .map((element: any) => ({
        title: element.day,
        data: element.elements.sort((a: any, b: any) => b.created - a.created),
      }))
      .sort((a: Section, b: Section) => b.title.getTime() - a.title.getTime());
  }, [props.sections]);

  const {t} = useTranslation();

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <OperationListFilter
        containerStyle={styles.filter}
        filter={props.filter}
      />
      <View style={styles.card}>
        {sections && sections.length > 0 ? (
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => '' + item.created + index}
            renderSectionHeader={({section: {title}}) => (
              <OperationHeader
                containerStyle={styles.sectionHeader}
                date={title}
              />
            )}
            renderItem={item => (
              <OperationElement
                operation={item.item}
                fiatTicker={props.fiatTicker}
                cryptoTicker={props.cryptoTicker}
              />
            )}
            onEndReached={props.onEndReached}
            onEndReachedThreshold={0.5}
            style={styles.list}
          />
        ) : (
          <View style={styles.placeholder}>
            <Icon
              type={'feather'}
              name={'grid'}
              size={200}
              color={theme.colorsOld.secondary}
            />
            <Text style={styles.placeholderText}>
              {t('Operations not found')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  sectionHeader: {},
  filter: {
    flex: 1,
  },
  card: {
    flex: 12,
  },
  list: {},
  placeholder: {
    justifyContent: 'center',
    height: '96%',
  },
  placeholderText: {
    color: theme.colorsOld.secondary,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default OperationsList;
