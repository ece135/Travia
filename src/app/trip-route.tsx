import { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTripStore } from '@/store/tripStore';
import { Colors, Fonts, Spacing, Radius } from '@/constants/theme';

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
      ListHeaderComponent={
        <View>
          <Text style={styles.eyebrow}>{trip.destination}</Text>
          <Text style={styles.title}>Trip Route</Text>
        </View>
      }
      renderItem={({ item, index }) => {
        const dayName = new Date(item).toLocaleDateString('en-US', { weekday: 'long' });
        const plansForDay = trip.dayPlans.filter((p) => p.date === item);
        return (
          <View>
            {index > 0 && <View style={styles.dottedLine} />}
            <View style={styles.dayCard}>
              <Text style={styles.dayTitle}>{dayName}</Text>
              <Text style={styles.dayDate}>{item}</Text>

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
                  placeholderTextColor={Colors.gray}
                />
                <Pressable style={styles.addButton} onPress={() => handleAdd(item)}>
                  <Text style={styles.addButtonText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.lg, backgroundColor: Colors.paper },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.paper },
  emptyText: { fontFamily: Fonts.body, fontSize: 16, color: Colors.gray },
  eyebrow: { fontFamily: Fonts.bodyMedium, fontSize: 13, color: Colors.teal, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontFamily: Fonts.displayBold, fontSize: 28, color: Colors.navy, marginTop: Spacing.xs, marginBottom: Spacing.lg },
  dottedLine: { height: 20, marginLeft: Spacing.lg, borderLeftWidth: 2, borderLeftColor: Colors.sand, borderStyle: 'dashed' },
  dayCard: { backgroundColor: Colors.sand, borderWidth: 1, borderColor: Colors.sand, borderRadius: Radius.lg, padding: Spacing.md },
  dayTitle: { fontFamily: Fonts.displayBold, fontSize: 18, color: Colors.navy },
  dayDate: { fontFamily: Fonts.body, fontSize: 13, color: Colors.gray, marginBottom: Spacing.sm },
  noPlan: { fontFamily: Fonts.body, color: Colors.gray, fontStyle: 'italic' },
  planText: { fontFamily: Fonts.body, color: Colors.navy, marginTop: Spacing.xs },
  addRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  input: { flex: 1, borderWidth: 1, borderColor: Colors.sand, borderRadius: Radius.sm, padding: 10, fontFamily: Fonts.body, color: Colors.navy, backgroundColor: Colors.paper },
  addButton: { backgroundColor: Colors.saffron, borderRadius: Radius.sm, width: 44, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: Colors.navy, fontSize: 20, fontFamily: Fonts.bodySemiBold },
});