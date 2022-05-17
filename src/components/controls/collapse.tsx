import React, {ReactNode, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface CollapseProps {
  title: string;
  children: ReactNode;
  collapsed: boolean;
}

export default function Collapse(props: CollapseProps) {
  const {title, children, collapsed: defaultCollapsed} = props;

  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => {setCollapsed(!collapsed)}}>
        <Text style={styles.title}>{title}</Text>
        <CustomIcon
          name={'arrow-right1'}
          style={collapsed ? styles.iconCollapsed : styles.icon}
          size={18}
          color={theme.colors.lightGray}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        {!collapsed && children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width - 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 15 : 18,
    lineHeight: Layout.isSmallDevice ? 21: 28,
    color: theme.colors.white,
    marginTop: 12,
    textAlignVertical: 'center',
  },
  iconCollapsed: {
    transform: [{
      rotate: '90deg',
    }],
  },
  icon: {
    transform: [{
      rotate: '270deg',
    }],
  },
  content: { },
});
