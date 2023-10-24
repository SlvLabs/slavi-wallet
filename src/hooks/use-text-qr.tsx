import {useCallback, useState} from 'react';

export default function useTextQr(onQRRead: (data: string) => void) {
  const [shown, setShown] = useState<boolean>(false);

  const show = useCallback(() => setShown(true), []);
  const hide = useCallback(() => setShown(false), []);

  const onRead = useCallback(
    (data: string) => {
      console.log(data)
      onQRRead(data);
      hide();
    },
    [hide, onQRRead],
  );

  return {
    shown,
    show,
    hide,
    onRead,
  };
}
