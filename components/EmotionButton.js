import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

const EmotionButton = ({ emotion, color, onPress, isActive }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive, borderAnim]);

  const getTextColor = () => {
    if (color === "#FDD835" || color === "#FFEB3B") return "#000";
    return "#fff";
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.borderContainer,
          {
            borderWidth: borderAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 3],
            }),
            borderColor: color,
          },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={() => onPress(emotion)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: getTextColor() }]}>
              {emotion}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  borderContainer: {
    borderRadius: 8,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmotionButton;
