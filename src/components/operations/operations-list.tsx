import {OperationSections} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {SectionList, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import OperationHeader from './operation-header';
import OperationElement from './operation-element';
import {
  ListOperation,
  OperationListParams,
} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {Icon} from 'react-native-elements';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import OperationListFilter from './filter/operation-list-filter';

export interface OperationsListProps {
  sections: OperationSections;
  onEndReached: () => void;
  filter: (params: OperationListParams) => void;
  containerStyle?: ViewStyle;
  placeholderStyle?: ViewStyle;
  hideCoinsFilter?: boolean;
}

interface Section {
  title: Date;
  data: ListOperation[];
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
        hideCoinsFilter={props.hideCoinsFilter}
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
              />
            )}
            onEndReached={props.onEndReached}
            onEndReachedThreshold={0.5}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={{...styles.placeholder, ...props.placeholderStyle}}>
            <View style={styles.iconContainer}>
              <Icon
                type={'feather'}
                name={'grid'}
                size={64}
                color={theme.colors.textLightGray1}
              />
            </View>
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
    paddingLeft: 16,
    paddingRight: 16,
  },
  list: {},
  placeholder: {
    justifyContent: 'center',
    height: '96%',
  },
  placeholderText: {
    color: theme.colors.textLightGray1,
    fontSize: 20,
    lineHeight: 28,
    marginTop: 24,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: theme.colors.mediumBackground,
    padding: 30,
    alignSelf: 'center',
    borderRadius: 16,
  }
});

export default OperationsList;
