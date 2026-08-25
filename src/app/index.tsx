import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTripStore } from '@/store/tripStore';

export default function HomeScreen() {
  const router = useRouter();
  const loadTrip = useTripStore((state) => state.loadTrip);

  useEffect(() => {
    loadTrip();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => router.push('/create-trip')}>
        <Text style={styles.buttonText}>Create Trip</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/trip-route')}>
        <Text style={styles.buttonText}>Trip Route</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/budget')}>
        <Text style={styles.buttonText}>Budget</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 16 },
  button: { backgroundColor: '#2563eb', padding: 18, borderRadius: 12 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});