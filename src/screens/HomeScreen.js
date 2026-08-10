
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('CreateTrip')}>
        <Text style={styles.buttonText}>Create Trip</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('TripRoute')}>
        <Text style={styles.buttonText}>Trip Route</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Budget')}>
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