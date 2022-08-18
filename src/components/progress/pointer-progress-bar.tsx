import React, {ReactNode, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../../theme';

export interface PointerProgressBarProps {
  stepsCount: number;
  activeStep: number;
  activeColor?: string;
}

export default function PointerProgressBar(props: PointerProgressBarProps) {
  const {stepsCount, activeStep, activeColor} = props;

  const renderPoints = useMemo(() => {
    const res: ReactNode[] = [];
    for (let i = 0; i < stepsCount; i++) {
      let style = styles.point;
      if (i === activeStep) {
        style = styles.activePoint;
        if (activeColor) {
          style = {...style, backgroundColor: activeColor};
        }
      }

      res.push(<View style={style} key={`point_${i}`} />);
    }

    return res;
  }, [activeColor, stepsCount, activeStep]);

  return <View style={styles.container}>{renderPoints}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textDarkGray,
    margin: 8,
  },
  activePoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.borderGreen,
    margin: 8,
  },
});
