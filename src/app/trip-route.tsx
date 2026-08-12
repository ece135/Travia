import { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTripStore } from '@/store/tripStore';

function getDateRange(start: string, end: string) {
  const dates: string[] = [];
  let current = new Date(start);
  const last = new Date(end);
  while (current <= last) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function TripRouteScreen() {
  const trip = useTripStore((state) => state.trip);
  const addDayPlan = useTripStore((state) => state.addDayPlan);

  const [inputs, setInputs] = useState<Record<string, string>>({});

  if (!trip) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No trip yet. Create one first.</Text>
      </View>
    );
  }

  const days = getDateRange(trip.startDate, trip.endDate);

  const handleAdd = (date: string) => {
    const text = inputs[date];
    if (!text) return;
    addDayPlan({ id: Date.now().toString(), date, note: text });
    setInputs((prev) => ({ ...prev, [date]: '' }));
  };

  return (
    <FlatList
      data={days}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const dayName = new Date(item).toLocaleDateString('en-US', { weekday: 'long' });
        const plansForDay = trip.dayPlans.filter((p) => p.date === item);
        return (
          <View style={styles.dayCard}>
            <Text style={styles.dayTitle}>{dayName}, {item}</Text>

            {plansForDay.length === 0 ? (
              <Text style={styles.noPlan}>No plans yet</Text>
            ) : (
              plansForDay.map((p) => <Text key={p.id} style={styles.planText}>• {p.note}</Text>)
            )}

            <View style={styles.addRow}>
              <TextInput
                style={styles.input}
                value={inputs[item] || ''}
                onChangeText={(text) => setInputs((prev) => ({ ...prev, [item]: text }))}
                placeholder="Add a plan..."
              />
              <Pressable style={styles.addButton} onPress={() => handleAdd(item)}>
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666' },
  dayCard: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 16 },
  dayTitle: { fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 8 },
  noPlan: { color: '#999' },
  planText: { color: '#000', marginTop: 4 },
  addRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, color: '#000', backgroundColor: '#fff' },
  addButton: { backgroundColor: '#2563eb', borderRadius: 8, width: 44, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});