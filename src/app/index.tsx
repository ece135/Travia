import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTripStore } from '@/store/tripStore';
import { Colors, Fonts, Spacing, Radius } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const loadTrip = useTripStore((state) => state.loadTrip);
  const trip = useTripStore((state) => state.trip);

  useEffect(() => {
    loadTrip();
  }, []);

  const menuItems = [
    { key: 'create-trip', label: 'Create Trip', sub: 'Start planning a new journey' },
    { key: 'trip-route', label: 'Trip Route'},
    { key: 'budget', label: 'Budget' },
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Welcome back</Text>
      <Text style={styles.title}>Travia</Text>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <View key={item.key}>
            <Pressable style={styles.card} onPress={() => router.push(`/${item.key}`)}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.lightTeal, padding: Spacing.lg, paddingTop: 80 },
  eyebrow: { fontFamily: Fonts.bodyMedium, fontSize: 14, color: Colors.teal, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontFamily: Fonts.displayBold, fontSize: 40, color: Colors.navy, marginTop: Spacing.xs, marginBottom: Spacing.xl },
  menu: { gap: 0 },
  card: {
    backgroundColor: Colors.sand,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.sand,
  },
  cardLabel: { fontFamily: Fonts.displayBold, fontSize: 20, color: Colors.navy },
  cardSub: { fontFamily: Fonts.body, fontSize: 14, color: Colors.gray, marginTop: 2 },
  arrow: { fontSize: 25, color: Colors.saffron },
  dottedLine: {
    height: 20,
    marginLeft: Spacing.lg + 4,
    borderLeftWidth: 2,
    borderLeftColor: Colors.saffron,
    borderStyle: 'dashed',
  },
});