import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

export interface FullScreenModalProps {
  visible: boolean;
  onCancel: () => void;
  title?: string;
  children: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  rightIconName?: string;
  rightIconOnPress?: () => void;
  rightIconColor?: string;
}

const defaultAnimation = 'slide';
const defaultIconColor = theme.colors.lightGray;

const FullScreenModal = (props: FullScreenModalProps) => {
  return (
    <Modal
      animationType={props.animationType || defaultAnimation}
      visible={props.visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeIcon} onPress={props.onCancel}>
            <CustomIcon name={'close'} size={24} color={defaultIconColor} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            {props.title && <Text style={styles.title}>{props.title}</Text>}
          </View>
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={props.rightIconOnPress}>
            {props.rightIconName && (
              <CustomIcon
                name={props.rightIconName}
                size={24}
                color={props.rightIconColor || defaultIconColor}
              />
            )}
          </TouchableOpacity>
        </View>
        <LinearGradient {...theme.gradients.backgroundGradient} style={styles.content}>{props.children}</LinearGradient>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 55,
    backgroundColor: theme.colors.dark,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dark,
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
  content: {
    flex: 1
  },
});

export default FullScreenModal;
