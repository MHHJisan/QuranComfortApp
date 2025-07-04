import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const VerseCard = ({ verse }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={styles.arabic}>{verse.arabic}</Text>
      <View style={styles.divider} />
      <Text style={styles.translation}>{verse.bangla}</Text>
      <Text style={styles.translation}>{verse.english}</Text>
      <Text style={styles.reference}>{verse.reference}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
    elevation: 3,
    width: "95%",
    alignSelf: "center",
  },
  arabic: {
    fontFamily: "AmiriRegular",
    fontSize: 24,
    textAlign: "right",
    lineHeight: 40,
    marginBottom: 15,
  },
  translation: {
    fontSize: 16,
    marginVertical: 8,
    lineHeight: 24,
  },
  reference: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "right",
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
});

export default VerseCard;
