import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Keyboard,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  ada,
  atom,
  avax,
  bnb, busd, dai,
  eth2,
  near, pax,
  polygon, slv,
  solana,
  trx, usdc, usdt
} from '../../assets/images';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../../components/custom-icon/custom-icon';
import Layout from '../../utils/layout';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native';

interface EarnCoin {
  name: string;
  logo: ImageSourcePropType;
}

enum Tabs {
  staking,
  stables
}

const TabsCoins: Record<Tabs, EarnCoin[]> = {
  [Tabs.staking]: [
    {name: 'SLV', logo: slv},
    {name: 'MATIC', logo: polygon},
    {name: 'BNB', logo: bnb},
    {name: 'SOL', logo: solana},
    {name: 'ETH 2.0', logo: eth2},
    {name: 'ADA', logo: ada},
    {name: 'AVAX', logo: avax},
    {name: 'ATOM', logo: atom},
    {name: 'NEAR', logo: near},
    {name: 'TRX', logo: trx},
  ],
  [Tabs.stables]: [
    {name: 'BUSD', logo: busd},
    {name: 'USDC', logo: usdc},
    {name: 'DAI', logo: dai},
    {name: 'USDT', logo: usdt},
    {name: 'USDP', logo: pax},
  ],
}

interface PlateColumnProps {
  coins: EarnCoin[];
}

const PlateColumn = (props: PlateColumnProps) => {
  const {coins} = props;

  return (
    <View style={styles.plateColumn}>
      {coins.map((coin, index) => (
        <View style={styles.coinPlate} key={`plate_${index}`}>
          <Image source={coin.logo} style={styles.plateLogo} />
          <Text style={styles.plateTitle}>{coin.name}</Text>
        </View>
      ))}
    </View>
  );
};

interface TabsContentProps {
  coins: EarnCoin[];
  isListDisplayMode: boolean;
}

const TabsContent = (props: TabsContentProps) => {
  const {coins, isListDisplayMode} = props;

  if (isListDisplayMode) {
    return (
      <View style={styles.contentRows}>
        {coins.map((coin, index) => (
          <View style={styles.coinRow} key={`row_${index}`}>
            <Image source={coin.logo} style={styles.listLogo}/>
            <Text style={styles.listTitle}>{coin.name}</Text>
          </View>
        ))}
      </View>
    );
  }

  const firstColumn: EarnCoin[] = [];
  const secondColumn: EarnCoin[] = [];

  coins.forEach((coin, index) => {
    if(index % 2 === 0) {
      firstColumn.push(coin);
    } else {
      secondColumn.push(coin);
    }
  })

  return (
    <View style={styles.contentPlate}>
      <PlateColumn coins={firstColumn} />
      <PlateColumn coins={secondColumn} />
    </View>
  );
}

const DefiScreen = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.staking);
  const [isListDisplayMode, setListDisplayMode] = useState<boolean>(false);

  const navigation = useNavigation();
  const {t} = useTranslation();

  const tabNames: Record<Tabs, string> = useMemo(() => ({
    [Tabs.staking]: t('staking'),
    [Tabs.stables]: t('stables'),
  }), [t])

  const onBackPress = useCallback(() => {
    if(navigation.canGoBack()) {
      navigation.goBack();
      Keyboard.dismiss();
    }
  }, [navigation]);
  const switchDisplayMode = () => setListDisplayMode(!isListDisplayMode);

  const tabs = useMemo(() => Object.entries(tabNames).map(([key, name]) => {
    const castedKey: Tabs = +key;
    const tab = (
      <TouchableOpacity
        onPress={() => setActiveTab(castedKey)}
        style={castedKey == activeTab ? styles.activeTabContainer : styles.tabContainer}
        key={`tab_${key}`}
      >
        <Text style={castedKey === activeTab ? styles.activeTabLabel : styles.tabLabel}>{name}</Text>
      </TouchableOpacity>
    );
    return (
      castedKey === activeTab ? (
        <LinearGradient {...theme.gradients.activeTab} style={styles.tabGradient}>
          {tab}
        </LinearGradient>
      )
        :
        tab
    );
  }), [tabNames, activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient {...theme.gradients.screenBackground} style={styles.gradient}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{...styles.button, ...styles.backButton}} onPress={onBackPress}>
            <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.header}>{t('earn')}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} onPress={switchDisplayMode}>
              <CustomIcon name={isListDisplayMode ? 'Category' : 'lines'} size={20} color={theme.colors.textLightGray3} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabs}>
          {tabs}
        </View>
        <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <TabsContent coins={TabsCoins[activeTab]} isListDisplayMode={isListDisplayMode} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 12,
    marginBottom: 18,
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: Layout.isSmallDevice ? 14 : 18,
    lineHeight: 28,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  subHeader: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: Layout.isSmallDevice ? 14 : 18,
    lineHeight: 28,
    color: theme.colors.maxTransparent,
    textTransform: 'capitalize',
    marginLeft: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    transform: [{
      rotate: '180deg',
    }],
  },
  titleView: {
    flexDirection: 'row',
  },
  tabs: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.mediumBackground,
    marginBottom: 24,
  },
  activeTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  activeTabLabel: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.white,
  },
  tabLabel: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.textLightGray1,
  },
  contentRows: {},
  contentPlate: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  coinRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.screenBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  listLogo: {
    width: 32,
    height: 32,
  },
  listTitle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.white,
    textTransform: 'uppercase',
    marginLeft: 16,
  },
  coinPlate: {
    backgroundColor: theme.colors.screenBackground,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.isSmallDevice ? 148 : 165,
    marginBottom: 8,
  },
  plateLogo: {
    width: 50,
    height: 50,
  },
  plateTitle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.white,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 16,
  },
  tabGradient: {
    flex: 1,
    borderRadius: 8,
  },
  plateColumn: {
    flexDirection: 'column',
  }
});

export default DefiScreen;
