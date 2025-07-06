// DuasScreen.js
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Appbar, useTheme, IconButton } from "react-native-paper";
import EmotionButton from "../components/EmotionButton";
import VerseCarousel from "../components/VerseCarousel"; // Reusing for duas
import duasData from "../data/duas.json"; // Create this file
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

const DuasScreen = () => {
  const { colors } = useTheme();
  const [currentDuas, setCurrentDuas] = useState(null);
  const [currentEmotion, setCurrentEmotion] = useState(null);

  const handleEmotionPress = (emotion) => {
    const key = emotion.toLowerCase().replace(/\s+/g, "");

    if (duasData[key] && duasData[key].length > 0) {
      const shuffledDuas = shuffleArray(duasData[key]);
      setCurrentDuas(shuffledDuas);
      setCurrentEmotion(emotion);
    } else {
      const fallbackDua = [
        {
          arabic:
            "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          bangla:
            "হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দান করুন এবং আখিরাতেও কল্যাণ দান করুন, এবং আমাদেরকে জাহান্নামের শাস্তি থেকে রক্ষা করুন",
          english:
            "Our Lord! Give us in this world that which is good and in the Hereafter that which is good, and save us from the torment of the Fire!",
          reference: "Surah Al-Baqarah (2:201)",
        },
      ];
      setCurrentDuas(fallbackDua);
      setCurrentEmotion(emotion);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.Content
          title="Dua Comfort"
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        />
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

        {currentDuas ? (
          <VerseCarousel verses={currentDuas} />
        ) : (
          <Text style={[styles.placeholder, { color: colors.text }]}>
            Select an emotion to see relevant Duas
          </Text>
        )}

        {currentDuas && (
          <Text style={[styles.swipeHint, { color: colors.text }]}>
            Swipe left or right to see more Duas
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

export default DuasScreen;
