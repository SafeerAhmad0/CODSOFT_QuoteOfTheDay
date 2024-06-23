import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function LottleAnimation({ source }) {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play(30, 120);
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <LottieView
        ref={animationRef}
        source={source}
        style={{ flex: 1 }}
      />
    </View>
  );
}
