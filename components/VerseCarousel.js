import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { IconButton } from "react-native-paper"; // Added import
import VerseCard from "./VerseCard";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.2;
const SWIPE_OUT_DURATION = 250;

const VerseCarousel = ({ verses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedVerses, setDisplayedVerses] = useState([]);
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (verses && verses.length > 0) {
      setDisplayedVerses(verses);
      setCurrentIndex(0);
      pan.setValue({ x: 0, y: 0 });
    }
  }, [verses]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dx) < SWIPE_THRESHOLD) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 8,
          useNativeDriver: true,
        }).start();
        return;
      }

      if (gesture.dx < 0) {
        animateSwipe(-width, () => {
          setCurrentIndex((prev) =>
            prev < displayedVerses.length - 1 ? prev + 1 : 0
          );
        });
      } else {
        animateSwipe(width, () => {
          setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : displayedVerses.length - 1
          );
        });
      }
    },
  });

  const animateSwipe = (direction, callback) => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: direction, y: 0 },
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      pan.setValue({ x: 0, y: 0 });
      fadeAnim.setValue(1);
      callback();
    });
  };

  const getRandomVerse = () => {
    if (displayedVerses.length <= 1) return;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * displayedVerses.length);
    } while (newIndex === currentIndex && displayedVerses.length > 1);

    setCurrentIndex(newIndex);
  };

  if (!displayedVerses || displayedVerses.length === 0) return null;

  const transformStyle = {
    transform: [{ translateX: pan.x }],
    opacity: fadeAnim,
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.cardContainer, transformStyle]}
        {...panResponder.panHandlers}
      >
        <VerseCard verse={displayedVerses[currentIndex]} />
      </Animated.View>

      {/* <IconButton
        icon="shuffle"
        size={30}
        onPress={getRandomVerse}
        style={styles.shuffleButton}
        color="#2e7d32"
      /> */}

      <View style={styles.pagination}>
        {displayedVerses.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex ? styles.activeDot : {}]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    marginVertical: 20,
    alignItems: "center",
    // backgroundColor: "#F3F4F6",
  },
  cardContainer: {
    width: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2e7d32",
    width: 12,
  },
  shuffleButton: {
    marginVertical: 10,
  },
});

export default VerseCarousel;
