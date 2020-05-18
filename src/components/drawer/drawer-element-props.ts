import {TextStyle, ViewStyle} from 'react-native';

export default interface DrawerElementProps {
  iconName: string;
  text: string;
  onPress: () => void;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
}
