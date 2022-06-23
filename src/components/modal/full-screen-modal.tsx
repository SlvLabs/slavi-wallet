import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import LinearGradient from 'react-native-linear-gradient';

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
  return (
    <Modal
      animationType={props.animationType || defaultAnimation}
      visible={props.visible}>
      <LinearGradient {...theme.gradients.screenBackground} style={styles.container}>
        <View style={styles.paddingContainer}>
          <View style={styles.header}>
            {!props.hideCloseButton && (
              <TouchableOpacity style={styles.closeIcon} onPress={props.onCancel}>
                <CustomIcon name={'close'} size={24} color={defaultIconColor} />
              </TouchableOpacity>
            )}
            <View style={styles.titleContainer}>
              {props.title && <Text style={styles.title}>{props.title}</Text>}
            </View>
            {props.rightIconName && (
              <TouchableOpacity
              style={styles.rightIcon}
              onPress={props.rightIconOnPress}>
                <CustomIcon
                  name={props.rightIconName}
                  size={24}
                  color={props.rightIconColor || defaultIconColor}
                />
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
  },
  paddingContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  closeIcon: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 11,
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
