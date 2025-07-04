import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Appbar, useTheme, IconButton } from "react-native-paper";
import EmotionButton from "../components/EmotionButton";
import VerseCarousel from "../components/VerseCarousel";
import versesData from "../data/verses.json";
import { shuffleArray } from "../utils/shuffle";

const emotions = [
  "Happy",
  "Forgiveness",
  "Anxious",
  "Depressed",
  "Lonely",
  "Comfort",
  "Angry",
  "Motivational",
  "Sad",
  "Thankful",
  "Halal Rizq",
];

const emotionColors = {
  Happy: "#43A047",
  Forgiveness: "#7B1FA2",
  Anxious: "#FB8C00",
  Depressed: "#E64A19",
  Lonely: "#1976D2",
  Comfort: "#0097A7",
  Angry: "#D32F2F",
  Motivational: "#FDD835",
  Sad: "#455A64",
  Thankful: "#7CB342",
  "Halal Rizq": "#5D4037",
};

const HomeScreen = () => {
  const { colors } = useTheme();
  const [currentVerses, setCurrentVerses] = useState(null);
  const [currentEmotion, setCurrentEmotion] = useState(null);

  const handleEmotionPress = (emotion) => {
    const key = emotion.toLowerCase().replace(/\s+/g, "");

    if (versesData[key] && versesData[key].length > 0) {
      const shuffledVerses = shuffleArray(versesData[key]);
      setCurrentVerses(shuffledVerses);
      setCurrentEmotion(emotion);
    } else {
      const fallbackVerse = [
        {
          arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ",
          bangla: "আল্লাহ, তিনি ছাড়া কোনো ইলাহ নেই",
          english: "Allah - there is no deity except Him",
          reference: "Surah Al-Baqarah (2:255)",
        },
      ];
      setCurrentVerses(fallbackVerse);
      setCurrentEmotion(emotion);
    }
  };

  const handleRandomPress = () => {
    if (currentVerses && currentVerses.length > 0) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * currentVerses.length);
      } while (newIndex === currentIndex && currentVerses.length > 1);

      // This state would need to be tracked in VerseCarousel
      // We'll need to lift state up or use refs - simpler solution:
      // We'll remove random button from header for now
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.Content
          title="Quranic Comfort"
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        />
        {currentEmotion && (
          <IconButton
            icon="shuffle"
            size={24}
            onPress={handleRandomPress}
            color="#2e7d32"
          />
        )}
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          How are you feeling today?
        </Text>

        <View style={styles.buttonContainer}>
          {emotions.map((emotion) => (
            <EmotionButton
              key={emotion}
              emotion={emotion}
              color={emotionColors[emotion]}
              onPress={handleEmotionPress}
              isActive={currentEmotion === emotion}
            />
          ))}
        </View>

        {currentEmotion && (
          <Text
            style={[
              styles.selectedEmotion,
              { color: emotionColors[currentEmotion] },
            ]}
          >
            {currentEmotion}
          </Text>
        )}

        {currentVerses ? (
          <VerseCarousel verses={currentVerses} />
        ) : (
          <Text style={[styles.placeholder, { color: colors.text }]}>
            Select an emotion to see relevant Quranic verses
          </Text>
        )}

        {currentVerses && (
          <Text style={[styles.swipeHint, { color: colors.text }]}>
            Swipe left or right to see more verses
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    alignItems: "center",
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    marginTop: 50,
    textAlign: "center",
    fontStyle: "italic",
  },
  selectedEmotion: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  swipeHint: {
    fontSize: 14,
    marginTop: 10,
    fontStyle: "italic",
    color: "#666",
  },
});

export default HomeScreen;
