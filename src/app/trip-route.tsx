import { useTripStore } from "@/store/tripStore";
import { FlatList, StyleSheet, Text, View } from "react-native";

function getDateRange(start: string, end: string) {
  const dates: string[] = [];
  let current = new Date(start);
  const last = new Date(end);
  while (current <= last) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function TripRouteScreen() {
  const trip = useTripStore((state) => state.trip);

  if (!trip) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No trip yet. Create one first.</Text>
      </View>
    );
  }

  const days = getDateRange(trip.startDate, trip.endDate);

  return (
    <FlatList
      data={days}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const dayName = new Date(item).toLocaleDateString("en-US", {
          weekday: "long",
        });
        const plansForDay = trip.dayPlans.filter((p) => p.date === item);
        return (
          <View style={styles.dayCard}>
            <Text style={styles.dayTitle}>
              {dayName}, {item}
            </Text>
            {plansForDay.length === 0 ? (
              <Text style={styles.noPlan}>No plans yet</Text>
            ) : (
              plansForDay.map((p) => (
                <Text key={p.id} style={styles.planText}>
                  • {p.note}
                </Text>
              ))
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#666" },
  dayCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
  },
  dayTitle: { fontSize: 16, fontWeight: "700", color: "#000", marginBottom: 8 },
  noPlan: { color: "#999" },
  planText: { color: "#c72b2b", marginTop: 4 },
});
