import { useTripStore } from "@/store/tripStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function CreateTripScreen() {
  const router = useRouter();
  const createTrip = useTripStore((state) => state.createTrip);
  const addPlace = useTripStore((state) => state.addPlace);
  const trip = useTripStore((state) => state.trip);

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleCreate = () => {
    createTrip(destination, formatDate(startDate), formatDate(endDate));
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
      <Pressable style={styles.input} onPress={() => setShowStartPicker(true)}>
        <Text style={{ color: "#000" }}>{formatDate(startDate)}</Text>
      </Pressable>
      {showStartPicker && (
        <View>
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            themeVariant="light"
            style={{ height: 180 }}
            onChange={(event, selectedDate) => {
              if (selectedDate) setStartDate(selectedDate);
              if (Platform.OS !== "android") setShowStartPicker(false);
            }}
          />
          {Platform.OS === "ios" && (
            <Pressable
              style={styles.doneButton}
              onPress={() => setShowStartPicker(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          )}
        </View>
      )}

      <Text style={styles.label}>End Date</Text>
      <Pressable style={styles.input} onPress={() => setShowEndPicker(true)}>
        <Text style={{ color: "#000" }}>{formatDate(endDate)}</Text>
      </Pressable>

      {showEndPicker && (
        <View>
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            themeVariant="light"
            style={{ height: 180 }}
            onChange={(event, selectedDate) => {
              if (selectedDate) setEndDate(selectedDate);
              if (Platform.OS === "android") setShowEndPicker(false);
            }}
          />
          {Platform.OS === "ios" && (
            <Pressable
              style={styles.doneButton}
              onPress={() => setShowEndPicker(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          )}
        </View>
      )}

      <Text style={styles.label}>Places to Visit</Text>
      {trip?.places.map((p) => (
        <Text key={p.id} style={styles.placeItem}>
          • {p.name} ({p.category})
        </Text>
      ))}
      <Pressable
        style={styles.addPlaceButton}
        onPress={() => router.push("/add-place")}
      >
        <Text style={styles.addPlaceText}>+ Add Place</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Trip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 8, backgroundColor: "#fff" },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12, color: "#000" },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  placeItem: { fontSize: 15, color: "#000", marginTop: 6 },
  addPlaceButton: {
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  addPlaceText: { color: "#2563eb", textAlign: "center", fontWeight: "600" },
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
  doneButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  doneButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
