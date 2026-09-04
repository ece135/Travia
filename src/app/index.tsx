import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useTripStore } from '@/store/tripStore';
import { Colors, Fonts, Spacing, Radius } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const loadTrips = useTripStore((state) => state.loadTrips);
  const trips = useTripStore((state) => state.trips);
  const activeTripId = useTripStore((state) => state.activeTripId);
  const setActiveTrip = useTripStore((state) => state.setActiveTrip);

  useEffect(() => {
    loadTrips();
  }, []);
  const activeTrip = trips.find((t) => t.id === activeTripId);
  const menuItems = [
    { key: 'trip-route', label: 'Trip Route', sub: activeTrip ? activeTrip.destination : 'Select a trip below'},
    { key: 'budget', label: 'Budget' , sub: activeTrip ? `${activeTrip.totalBudget} planned` : 'Select a trip below' },
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Welcome back</Text>
      <Text style={styles.title}>Travia</Text>

      <Pressable style={styles.newTripButton} onPress={() => router.push('/create-trip')}>
        <Text style={styles.newTripText}>+ New Trip</Text>
      </Pressable>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <View key={item.key}>
            <Pressable
              style={[styles.card, !activeTrip && styles.cardDisabled]}
              onPress={() => activeTrip && router.push(`/${item.key}`)}
            >
              <View>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardSub}>{item.sub}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
            {index < menuItems.length - 1 && <View style={styles.dottedLine} />}
          </View>
        ))}
      </View>

    <Text style={styles.sectionLabel}>Your Trips</Text>
    <FlatList 
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.tripRow, item.id === activeTripId && styles.tripRowActive]}
            onPress={() => setActiveTrip(item.id)}
          >
            <Text style={styles.tripName}>{item.destination}</Text>
            <Text style={styles.tripDates}>{item.startDate} — {item.endDate}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No trips yet. Create your first one above.</Text>}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.paper, padding: Spacing.lg, paddingTop: 80 },
  eyebrow: { fontFamily: Fonts.bodyMedium, fontSize: 14, color: Colors.teal, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontFamily: Fonts.displayBold, fontSize: 40, color: Colors.navy, marginTop: Spacing.xs, marginBottom: Spacing.lg },
  newTripButton: { backgroundColor: Colors.saffron, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.lg },
  newTripText: { fontFamily: Fonts.bodySemiBold, color: Colors.navy, textAlign: 'center', fontSize: 16 },
  menu: { gap: 0, marginBottom: Spacing.lg },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: Colors.sand },
  cardDisabled: { opacity: 0.5 },
  cardLabel: { fontFamily: Fonts.displayBold, fontSize: 20, color: Colors.navy },
  cardSub: { fontFamily: Fonts.body, fontSize: 14, color: Colors.gray, marginTop: 2 },
  arrow: { fontSize: 20, color: Colors.saffron },
  dottedLine: { height: 20, marginLeft: Spacing.lg + 4, borderLeftWidth: 2, borderLeftColor: Colors.sand, borderStyle: 'dashed' },
  sectionLabel: { fontFamily: Fonts.bodySemiBold, fontSize: 14, color: Colors.navy, marginBottom: Spacing.sm },
  tripRow: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.sand },
  tripRowActive: { borderColor: Colors.teal, borderWidth: 2 },
  tripName: { fontFamily: Fonts.bodySemiBold, fontSize: 16, color: Colors.navy },
  tripDates: { fontFamily: Fonts.body, fontSize: 13, color: Colors.gray, marginTop: 2 },
  emptyText: { fontFamily: Fonts.body, color: Colors.gray, marginTop: Spacing.md },
});