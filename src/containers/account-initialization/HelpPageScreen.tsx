import {Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {useDispatch} from 'react-redux';
import {hideReferral, showReferral} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import Layout from '../../utils/layout';
import CustomIcon from '../../components/custom-icon/custom-icon';
import HelpWavesBackground from '../../components/background/help-waves-background';
import {help_1, help_2, help_3, help_4, help_5} from '../../assets/images';
import Carousel from 'react-native-snap-carousel';
import {useGetReferralInfo} from '@slavi/wallet-core/src/providers/ws/hooks/referral/use-get-referral-info';
import {CampaignStatus} from '@slavi/wallet-core/src/providers/ws/messages/refferal';
import ROUTES from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';

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
const allPagesWithEnd = [...allPages, allPages.length];

type PagesHeaders = `help_header_${Pages}`;
type PagesDescriptions = `help_description_${Pages}`;

interface JumpButtonProps {
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

export default function HelpPageScreen() {
  const [readyToNext, setReadyToNext] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const _currentPageRef = useRef<number>(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {isLoading, data} = useGetReferralInfo(true);

  const toNext = useCallback(() => {
    setReadyToNext(true);
  }, []);

  useEffect(() => {
    if (!readyToNext || isLoading || !data) {
      return;
    }

    if (data?.campaignStatus === CampaignStatus.active) {
      dispatch(
        showReferral({
          invitingCode: data.invitingCode,
          codeLen: data.codeLength,
        }),
      );
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROUTES.MAIN.REFERRAL,
          },
        ],
      });
    } else {
      dispatch(hideReferral());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROUTES.MAIN.TABS,
          },
        ],
      });
    }
  }, [data, dispatch, isLoading, navigation, readyToNext]);

  const onSnapToItem = useCallback(
    (newIndex: number) => {
      if (newIndex === allPages.length) {
        toNext();
        return;
      }
      setCurrentPage(newIndex);
      _currentPageRef.current = newIndex;
    },
    [toNext],
  );

  const {t} = useTranslation();
  const headers = useMemo(() => allPages.map(p => t(`help_header_${p}` as PagesHeaders)), [t]);
  const descriptions = useMemo(() => allPages.map(p => t(`help_description_${p}` as PagesDescriptions)), [t]);

  let carousel = useRef<Carousel<any> | null>(null);
  const snapToNext = useCallback(() => {
    if (carousel.current) {
      if (_currentPageRef.current === allPages.length - 1) {
        toNext();
      } else {
        carousel.current.snapToNext();
      }
    }
  }, [carousel, toNext]);

  const snapToPrev = useCallback(() => {
    if (carousel.current) {
      carousel.current.snapToPrev();
    }
  }, [carousel]);
  const onSkip = useCallback(() => {
    toNext();
  }, [toNext]);

  const _renderItem = useCallback(
    ({item}: {item: Pages}) => {
      if (item === allPages.length) {
        return <View style={styles.logoViewView2} />;
      }
      return (
        <View style={styles.logoViewView2}>
          <View style={styles[`logoView${item}` as LogoViewWithPage]}>
            <Image source={images[item]} style={styles[`logo${item}` as LogoWithPage]} />
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.header}>{headers[item]}</Text>
            <Text style={styles.description}>{descriptions[item]}</Text>
          </View>
        </View>
      );
    },
    [headers, descriptions],
  );
  const scrollPos = useRef<number | null>(null);
  const carouselOnScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (_currentPageRef.current === allPages.length) {
        toNext();
        return;
      }
      if (scrollPos.current !== null) {
        if (_currentPageRef.current === allPages.length - 1) {
          if (e.nativeEvent.contentOffset.x - scrollPos.current > Layout.window.width / 4) {
            toNext();
          }
        }
      }
    },
    [toNext],
  );

  const carouselOnScrollStart = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (_currentPageRef.current === allPages.length - 1) {
      scrollPos.current = e.nativeEvent.contentOffset.x;
    } else {
      scrollPos.current = null;
    }
  }, []);

  return (
    <HelpWavesBackground>
      <View style={styles.container}>
        <View style={styles.skipWrap}>
          <TouchableOpacity onPress={onSkip} style={styles.skipTouch}>
            <Text style={styles.skip}>{currentPage === allPages.length - 1 ? t('helpFinish') : t('helpSkip')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.carousel}>
          <Carousel
            ref={c => {
              carousel.current = c;
            }}
            onScrollIndexChanged={onSnapToItem}
            renderItem={_renderItem}
            data={allPagesWithEnd}
            sliderWidth={Layout.window.width - 60}
            itemWidth={Layout.window.width - 60}
            loop={false}
            enableSnap={true}
            shouldOptimizeUpdates={true}
            firstItem={0}
            inactiveSlideOpacity={-1}
            /* @ts-ignore */
            decelerationRate={'fast'}
            horizontal={true}
            vertical={false}
            disableIntervalMomentum={true}
            useExperimentalSnap={true}
            onScrollBeginDrag={carouselOnScrollStart}
            onScroll={carouselOnScroll}
          />
        </View>
        <View style={styles.loaderView}>
          <JumpButton onPress={snapToPrev} direction={'prev'} enabled={currentPage > 0} />
          <PointerProgressBar stepsCount={allPages.length} activeStep={currentPage} activeColor={theme.colors.violet} />
          <JumpButton onPress={snapToNext} direction={'next'} enabled={true} />
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
  carousel: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoViewView2: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    height: '100%',
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
    flex: 0,
  },
  skipTouch: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginRight: -20,
    marginTop: -20,
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
