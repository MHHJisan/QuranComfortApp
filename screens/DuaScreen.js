import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Wand, Shuffle, X } from "lucide-react-native"; // Replaced Smile with Wand
import duasData from "../data/duas.json";
import VerseCarousel from "../components/VerseCarousel";

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
  Happy: "#4CAF50",
  Forgiveness: "#9C27B0",
  Anxious: "#FF9800",
  Depressed: "#F44336",
  Lonely: "#2196F3",
  Comfort: "#00BCD4",
  Angry: "#D32F2F",
  Motivational: "#FFC107",
  Sad: "#607D8B",
  Thankful: "#8BC34A",
  "Halal Rizq": "#795548",
};

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const HomeScreen = () => {
  const [currentEmotion, setCurrentEmotion] = useState("Happy");
  const [shuffledVerses, setShuffledVerses] = useState([]);
  const [showEmotionModal, setShowEmotionModal] = useState(false);

  const loadEmotionContent = (emotion) => {
    const key = emotion.toLowerCase().replace(/\s+/g, "");
    const verseList = duasData[key] || [];
    const shuffled = shuffleArray(verseList);
    setCurrentEmotion(emotion);
    setShuffledVerses(shuffled);
  };

  useEffect(() => {
    loadEmotionContent("Happy");
  }, []);

  const handleEmotionSelect = (emotion) => {
    loadEmotionContent(emotion);
    setShowEmotionModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quranic Comfort</Text>
        <TouchableOpacity onPress={() => loadEmotionContent(currentEmotion)}>
          <Shuffle size={24} color="#1D4ED8" />
        </TouchableOpacity>
      </View>

      {/* Floating Emotion Icon (Right Side) */}
      <TouchableOpacity
        onPress={() => setShowEmotionModal(true)}
        style={styles.emotionFAB}
      >
        <Wand size={28} color="#fff" />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Text
          style={[styles.emotionText, { color: emotionColors[currentEmotion] }]}
        >
          {currentEmotion}
        </Text>

        <VerseCarousel verses={shuffledVerses} />

        <Text style={styles.swipeText}>Swipe or press shuffle to see more</Text>
      </View>

      {/* Emotion Modal (Left-Aligned) */}
      <Modal visible={showEmotionModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowEmotionModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalLeftContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Choose Emotion</Text>
                <TouchableOpacity onPress={() => setShowEmotionModal(false)}>
                  <X size={20} color="#000" />
                </TouchableOpacity>
              </View>
              {emotions.map((emotion) => (
                <TouchableOpacity
                  key={emotion}
                  onPress={() => handleEmotionSelect(emotion)}
                  style={[
                    styles.emotionButton,
                    { backgroundColor: emotionColors[emotion] },
                  ]}
                >
                  <Text style={styles.buttonText}>{emotion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    backgroundColor: "white",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emotionText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  swipeText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#6B7280",
    marginTop: 10,
  },

  // Changed position to right
  emotionFAB: {
    position: "absolute",
    top: 120,
    right: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    padding: 12,
    elevation: 6,
    zIndex: 10,
  },

  // Modal on left side
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalLeftContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginLeft: 20,
    maxHeight: "80%",
    width: 200,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  emotionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
