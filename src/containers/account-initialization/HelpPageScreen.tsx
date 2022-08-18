import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {useDispatch} from 'react-redux';
import {skipHelp} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {TabView} from 'react-native-tab-view';
import Layout from '../../utils/layout';
import CustomIcon from '../../components/custom-icon/custom-icon';
import HelpWavesBackground from '../../components/background/help-waves-background';
import {help_1, help_2, help_3, help_4, help_5} from '../../assets/images';

enum Pages {
  deposit,
  trade,
  buy,
  stake,
  nft,
}
const images = {
  [0]: help_1,
  [1]: help_2,
  [2]: help_3,
  [3]: help_4,
  [4]: help_5,
};
const allPages: Pages[] = [Pages.deposit, Pages.trade, Pages.buy, Pages.stake, Pages.nft];
interface RenderSceneParams {
  route: {key: string};
  jumpTo(key: string): void;
}
const RenderScene = ({route: {key}, jumpTo}: RenderSceneParams) => (
  <HelpPageScreen page={+key as Pages} jumpTo={jumpTo} />
);

const routes = allPages.map(p => ({key: p.toString()}));

export default function HelpPageTabs() {
  const [index, setIndex] = React.useState(0);
  return (
    <TabView
      renderTabBar={() => null}
      navigationState={{index, routes}}
      renderScene={RenderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Layout.window.width}}
    />
  );
}

type PagesHeaders = `help_header_${Pages}`;
type PagesDescriptions = `help_description_${Pages}`;

export interface JumpButtonProps {
  onPress(): void;
  direction: 'prev' | 'next';
  enabled: boolean;
}

function JumpButton({onPress, direction, enabled}: JumpButtonProps) {
  if (!enabled) {
    return <View style={styles.jumpButtonStub} />;
  }
  return (
    <TouchableOpacity style={styles.jumpButtonContainer} onPress={onPress}>
      <CustomIcon
        color={theme.colors.white}
        name={'carousel-arrow'}
        size={40}
        style={{
          ...(direction === 'prev' ? styles.prevIcon : styles.nextIcon),
        }}
      />
    </TouchableOpacity>
  );
}

export interface HelpPageScreenProps {
  page: Pages;
  jumpTo(page: string): void;
}

export function HelpPageScreen({page, jumpTo}: HelpPageScreenProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const headers = useMemo(() => allPages.map(p => t(`help_header_${p}` as PagesHeaders)), [t]);
  const descriptions = useMemo(() => allPages.map(p => t(`help_description_${p}` as PagesDescriptions)), [t]);
  const goLeft = useCallback(() => {
    if (page === 0) {
      return;
    }
    jumpTo((page - 1).toString());
  }, [jumpTo, page]);

  const goRight = useCallback(() => {
    if (page === allPages.length - 1) {
      dispatch(skipHelp());
    } else {
      jumpTo((page + 1).toString());
    }
  }, [jumpTo, dispatch, page]);

  const onSkip = useCallback(() => {
    dispatch(skipHelp());
  }, [dispatch]);

  return (
    <HelpWavesBackground>
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipWrap} onPress={onSkip}>
          <Text style={styles.skip}>{page === allPages.length - 1 ? t('helpFinish') : t('helpSkip')}</Text>
        </TouchableOpacity>
        <View style={styles[`logoView${page}` as LogoViewWithPage]}>
          <Image source={images[page]} style={styles[`logo${page}` as LogoWithPage]} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.header}>{headers[page]}</Text>
          <Text style={styles.description}>{descriptions[page]}</Text>
        </View>
        <View style={styles.loaderView}>
          <JumpButton onPress={goLeft} direction={'prev'} enabled={page > 0} />
          <PointerProgressBar stepsCount={allPages.length} activeStep={page} activeColor={theme.colors.violet} />
          <JumpButton onPress={goRight} direction={'next'} enabled={page < allPages.length - 1} />
        </View>
      </View>
    </HelpWavesBackground>
  );
}
type LogoViewWithPage = `logoView${Pages}`;
type LogoWithPage = `logo${Pages}`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonsBlock: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoView0: {
    flex: 0,
    marginBottom: Layout.isSmallDevice ? 80 : 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView1: {
    flex: 0,
    marginBottom: Layout.isSmallDevice ? 60 : 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView2: {
    flex: 0,
    marginBottom: Layout.isSmallDevice ? 70 : 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView3: {
    flex: 0,
    marginBottom: Layout.isSmallDevice ? 70 : 135,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView4: {
    flex: 0,
    marginBottom: Layout.isSmallDevice ? 70 : 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo0: {
    width: Layout.window.width * 0.52,
    height: Layout.window.width * 0.52,
  },
  logo1: {
    width: Layout.window.width * 0.65,
    height: Layout.window.width * 0.65,
  },
  logo2: {
    width: Layout.window.width * 0.6,
    height: Layout.window.width * 0.6,
  },
  logo3: {
    width: Layout.window.width * 0.6,
    height: Layout.window.width * 0.6,
  },
  logo4: {
    width: Layout.window.width * 0.6,
    height: Layout.window.width * 0.6,
  },
  textBlock: {
    flex: 0,
    marginBottom: Layout.isSmallDevice ? 47 : 75,
  },
  header: {
    alignSelf: 'center',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.colors.white,
    marginBottom: 20,
  },
  description: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  loaderView: {
    flex: 0,
    paddingTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jumpButtonContainer: {
    flex: 0,
    alignSelf: 'flex-start',
  },
  jumpButtonStub: {
    width: 40,
    height: 4,
  },
  prevIcon: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  nextIcon: {},
  skipWrap: {
    marginTop: 25,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  skip: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: theme.colors.white,
  },
});
