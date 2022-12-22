import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

const TWICE_PRESS_TIMEOUT = 2000;

export function useAppExit() {
  const [backClickedCount, setBackClickedCount] = useState<number>(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (backClickedCount > 0) {
        BackHandler.exitApp();
      } else {
        setBackClickedCount(p => p + 1);
        setTimeout(() => setBackClickedCount(0), TWICE_PRESS_TIMEOUT);
      }

      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [backClickedCount]);
}
