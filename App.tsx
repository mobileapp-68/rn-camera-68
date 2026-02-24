import "./global.css";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
export default function App() {
  const [open, setOpen] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  // Camera is still loading
  if (!cameraPermission) return <View />;

  // Ask for permission
  if (!cameraPermission.granted) {
    return (
      <View className="flex-1 justify-center">
        <TouchableOpacity
          onPress={requestCameraPermission}
          className="bg-purple-700 p-2"
        >
          <Text className="text-white text-2xl text-center">
            We need your permission.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 flex-col-reverse">
        <TouchableOpacity
          onPress={() => setOpen((prev) => !prev)}
          className="bg-purple-700 p-2"
        >
          <Text className="text-white text-2xl text-center">
            {!open ? "Turn On" : "Turn Off"}
          </Text>
        </TouchableOpacity>
        {open ? (
          <CameraView
            style={{ flex: 1 }}
            facing={"front"}
            onCameraReady={() => setOpen(true)}
          />
        ) : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
