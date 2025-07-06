import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";

const AboutScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="About Quranic Comfort" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to Quranic Comfort
        </Text>

        <Text style={[styles.paragraph, { color: colors.text }]}>
          Our mission is to provide spiritual comfort and guidance through the
          timeless wisdom of the Quran and authentic Islamic duas.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          How to Use the App
        </Text>

        <Text style={[styles.listItem, { color: colors.text }]}>
          1. Select the "Quran Verses" tab for Quranic verses related to your
          emotional state
        </Text>
        <Text style={[styles.listItem, { color: colors.text }]}>
          2. Choose the "Duas" tab for Islamic supplications relevant to your
          feelings
        </Text>
        <Text style={[styles.listItem, { color: colors.text }]}>
          3. Tap any emotion button to see relevant content
        </Text>
        <Text style={[styles.listItem, { color: colors.text }]}>
          4. Swipe left/right to see more verses or duas
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Features
        </Text>

        <Text style={[styles.listItem, { color: colors.text }]}>
          • Quranic verses for 11 emotional states
        </Text>
        <Text style={[styles.listItem, { color: colors.text }]}>
          • Authentic Islamic duas for various situations
        </Text>
        <Text style={[styles.listItem, { color: colors.text }]}>
          • Clean, distraction-free interface
        </Text>
        <Text style={[styles.listItem, { color: colors.text }]}>
          • Multilingual support (Arabic, English, Bangla)
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Our Sources
        </Text>

        <Text style={[styles.paragraph, { color: colors.text }]}>
          All Quranic verses are from the Holy Quran with authentic
          translations. Duas are collected from authentic Hadith sources and
          classical Islamic literature.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Contact Us
        </Text>

        <Text style={[styles.paragraph, { color: colors.text }]}>
          We welcome your feedback and suggestions. Please email us at:
        </Text>
        <Text style={[styles.email, { color: colors.primary }]}>
          support@quraniccomfort.app
        </Text>

        <Text style={[styles.footer, { color: colors.text }]}>
          © 2023 Quranic Comfort App. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
    color: "#2e7d32",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    textAlign: "justify",
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    lineHeight: 24,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  footer: {
    fontSize: 14,
    marginTop: 30,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.7,
  },
});

export default AboutScreen;
