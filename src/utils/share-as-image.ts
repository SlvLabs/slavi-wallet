import Share, {Options} from 'react-native-share';

async function shareAsImage(
  address: string,
  dataURL?: string | null,
  onError?: (e: any) => void,
) {
  if (!dataURL) {
    return;
  }
  const options: Options = {
    title: 'Share address',
    url: `data:image/png;base64,${dataURL}`,
    message: `My address: ${address}`,
    failOnCancel: false,
  };
  try {
    await Share.open(options);
  } catch (e) {
    if (onError) {
      onError(e);
    }
  }
}

export default shareAsImage;
