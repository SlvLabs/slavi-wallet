import dynamicLinks from '@react-native-firebase/dynamic-links';
import {getFirstInstallTimeSync} from 'react-native-device-info';
import {UtmServiceInterface} from '@slavi/wallet-core/src/services/interfaces';

const MAX_RETRIES = 10;

export function saveReferral(utmService?: UtmServiceInterface) {
  if (!utmService) {
    return;
  }

  let i = 0;

  const interval = setInterval(() => {
    if (i > MAX_RETRIES) {
      clearInterval(i);
    }

    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          utmService?.save(link?.url || '', getFirstInstallTimeSync()).then(() => {
            clearInterval(interval);
          });
        }
      })
      .catch(() => {
        clearInterval(interval);
      });

    i++;
  }, 500);
}
