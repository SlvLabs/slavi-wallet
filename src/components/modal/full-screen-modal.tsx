import React from 'react';
import {Modal, StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../../utils/layout';
import {useSelectIsAuthorized} from '@slavi/wallet-core/src/store/modules/auth/selectors';

export interface FullScreenModalProps {
  visible: boolean;
  onCancel: () => void;
  title?: string;
  children: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  rightIconName?: string;
  rightIconOnPress?: () => void;
  rightIconColor?: string;
  hideCloseButton?: boolean;
}

const defaultAnimation = 'slide';
const defaultIconColor = theme.colors.lightGray;

const FullScreenModal = (props: FullScreenModalProps) => {
  const isAuth = useSelectIsAuthorized();
  return (
    <Modal
      animationType={props.animationType || defaultAnimation}
      visible={isAuth && props.visible}
      statusBarTranslucent={true}
      onRequestClose={props.onCancel}>
      <LinearGradient {...theme.gradients.screenBackground} style={styles.container}>
        <View style={styles.paddingContainer}>
          <View style={styles.header}>
            {!props.hideCloseButton && (
              <TouchableOpacity style={styles.closeIcon} onPress={props.onCancel}>
                <CustomIcon name={'close'} size={24} color={defaultIconColor} />
              </TouchableOpacity>
            )}
            <View style={styles.titleContainer}>{props.title && <Text style={styles.title}>{props.title}</Text>}</View>
            {props.rightIconName && (
              <TouchableOpacity style={styles.rightIcon} onPress={props.rightIconOnPress}>
                <CustomIcon name={props.rightIconName} size={24} color={props.rightIconColor || defaultIconColor} />
              </TouchableOpacity>
            )}
          </View>
          {props.children}
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: Layout.isSmallDevice ? 20 : 50,
      },
    }),
  },
  paddingContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        marginTop: 50,
      },
    }),
  },
  closeIcon: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 11,
    marginLeft: -64,
  },
  rightIcon: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.01,
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.white,
  },
});

export default FullScreenModal;
