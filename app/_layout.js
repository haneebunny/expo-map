import { Slot } from "expo-router";
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { color } from "../config/color";

const windowHeight = Dimensions.get("window").height;

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: color.blue }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View className=" bg-gray-200 opacity-70 w-4/5 h-10 rounded-3xl p-1">
      <Text className="m-auto text-[12px]">{text1}</Text>
    </View>
  ),
};

export default function AppLayout() {
  return (
    <>
      <View>
        <KeyboardAvoidingView behavior="height">
          <SafeAreaView
            style={{
              paddingTop: Constants.statusBarHeight,
              // paddingBottom: windowHeight,
              paddingHorizontal: 0,
              paddingVertical: 0,
              height: "100%",
            }}
          >
            <Slot />

            <Toast config={toastConfig} />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
