import { useTripStore } from "@/store/tripStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateTripScreen() {
  const router = useRouter();
  const createTrip = useTripStore((state) => state.createTrip);

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreate = () => {
    createTrip(destination, startDate, endDate);
    router.push("/trip-route");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
        placeholder="e.g. Paris"
      />

      <Text style={styles.label}>Start Date</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="e.g. 2026-08-10"
      />

      <Text style={styles.label}>End Date</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
        placeholder="e.g. 2026-08-15"
      />

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Trip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 8 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
