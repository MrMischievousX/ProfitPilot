import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Alert, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {window} from '../constants/layout';
import {useIsFocused} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {Mask, Rect, Svg, TSpan, Text} from 'react-native-svg';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {COMMON} from '../constants/common';

type props = StackScreenProps<RootStackParamList, 'qrScreenTab'>;

const QRScreen = ({}: props) => {
  const inset = useSafeAreaInsets();

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    } else {
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: async codes => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      Alert.alert('Scanned QR', codes[0]?.value, [
        {text: 'OK', onPress: () => setIsLoading(false)},
      ]);
    },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    subHeading: {
      ...FONTS.subHeadingText,
    },
    cameraContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <View style={styles.camera}>
          {device && hasPermission && (
            <Camera
              style={StyleSheet.absoluteFillObject}
              device={device as CameraDevice}
              isActive={isFocused}
              codeScanner={codeScanner}
              enableZoomGesture={true}
            />
          )}
          <Svg height="100%" width="100%">
            <Mask id={'clip'}>
              <Rect fill="grey" width="100%" height="100%" />
              <Rect
                fill="black"
                width={COMMON.qrSize}
                height={COMMON.qrSize}
                x={(window.width - COMMON.qrSize) / 2}
                y={COMMON.tabIcon * 2.5 + inset.top}
                rx={COMMON.largeMargin}
                ry={COMMON.largeMargin}
              />
              <Text textAnchor="middle" y={COMMON.qrSize + COMMON.tabIcon * 6}>
                <TSpan
                  {...FONTS.secondaryTextBold}
                  fill={'black'}
                  inlineSize="100%">
                  Scan QR code
                </TSpan>
              </Text>
            </Mask>

            <Rect
              width="100%"
              height="100%"
              fill="rgba(0, 0, 0, 0.6)"
              mask={'url(#clip)'}
            />
          </Svg>
        </View>
      </View>
      {/* <View style={styles.btnContainer}>
        <Icon
          testID="go_back"
          iconStyle={styles.backButton}
          size={dp(22)}
          color={Colors.COMMONWhite}
          onPress={navigation.goBack}
          type="fonticons"
          name={Platform.OS === "ios" ? "chevron-right" : "arrow-forward"}
        />
        <View style={styles.btnView}>
          <ActionButton
            testID="qr_scan_upload_qr"
            style={styles.btn}
            btnTextStyle={styles.btnText}
            mode="contained"
            onPress={onPick}
            title="Upload QR"
          />
          <ActionButton
            testID="qr_scan_show_qr"
            style={styles.btn}
            btnTextStyle={styles.btnText}
            mode="contained"
            onPress={dispatcher.goToSettings}
            title="Show QR"
          />
        </View>
      </View> */}
    </View>
  );
};

export default QRScreen;
