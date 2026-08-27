import { Colors, Fonts, Radius, Spacing } from "@/constants/theme";
import { useTripStore } from "@/store/tripStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const CATEGORIES = [
  { key: "museum", label: "Museum" },
  { key: "restaurant", label: "Restaurant" },
  { key: "beach", label: "Beach" },
  { key: "other", label: "Other" },
] as const;

export default function AddPlaceScreen() {
  const router = useRouter();
  const addPlace = useTripStore((state) => state.addPlace);

  const [name, setName] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]["key"]>("museum");

  const handleAdd = () => {
    if (!name) return;
    addPlace({ id: Date.now().toString(), name, category });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>New Stop</Text>
      <Text style={styles.title}>Add Place</Text>

      <Text style={styles.label}>Place Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Louvre Museum"
        placeholderTextColor={Colors.gray}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.key}
            style={[
              styles.categoryChip,
              category === c.key && styles.categoryChipActive,
            ]}
            onPress={() => setCategory(c.key)}
          >
            <Text
              style={[
                styles.categoryText,
                category === c.key && styles.categoryTextActive,
              ]}
            >
              {c.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Place</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.sand },
  eyebrow: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.teal,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: Fonts.displayBold,
    fontSize: 28,
    color: Colors.navy,
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.navy,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.sand,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.navy,
    backgroundColor: Colors.white,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: Colors.sand,
    borderRadius: 20,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
  },
  categoryChipActive: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  categoryText: { fontFamily: Fonts.bodyMedium, color: Colors.navy },
  categoryTextActive: { color: Colors.white },
  button: {
    backgroundColor: Colors.saffron,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.xl,
  },
  buttonText: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.navy,
    textAlign: "center",
    fontSize: 16,
  },
});
