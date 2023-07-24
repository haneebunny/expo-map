import { Slot } from "expo-router";
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { color } from "../config/color";
import { NavigationContainer } from "expo-router/src/NavigationContainer";
import { socket } from "../src/socket";
import { useEffect } from "react";

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
  console.log("socketket");
  useEffect(() => {
    // const ws = new WebSocket("ws://10.0.2.2:4000");

    // ws.onopen = () => {
    //   // connection opened
    //   ws.send("something"); // send a message
    // };

    // ws.onmessage = (e) => {
    //   // a message was received
    //   console.log(e.data);
    // };

    // ws.onerror = (e) => {
    //   // an error occurred
    //   console.log(e.message);
    // };

    // ws.onclose = (e) => {
    //   // connection closed
    //   console.log(e.code, e.reason);
    // };

    socket.connect();

    // setSocket(socket);

    if (socket) {
      console.log("socket ininin ");
      socket.on("connect", onConnect);

      socket.on("connect_error", (error) => console.log("socket.io:", error));

      socket.on("disconnect", onDisconnect);

      socket.on("chat message", onChatMessage);

      socket.on("notice", onNotice);
    }

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
    };
  }, []);

  const onConnect = () => {
    console.log("connected");
  };

  const onDisconnect = () => {
    console.log("disconnected");
  };

  const onChatMessage = (data) => {
    console.log("chat::", data);
  };

  const onNotice = (msg) => {
    console.log(msg);
    // 기존 배열 복사
  };

  return (
    <>
      {/* <NavigationContainer> */}
      <SafeAreaView
        style={{
          paddingTop: Constants.statusBarHeight,
          // paddingBottom: windowHeight,
          paddingHorizontal: 0,
          paddingVertical: 0,

          flex: 1,
        }}
      >
        {/* <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}> */}
        <Slot />
        {/* </KeyboardAvoidingView> */}
        {/* </ScrollView> */}

        <Toast config={toastConfig} />
      </SafeAreaView>
      {/* </NavigationContainer> */}
    </>
  );
}
