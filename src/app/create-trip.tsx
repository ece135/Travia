import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTripStore } from '@/store/tripStore';
import { Colors, Fonts, Spacing, Radius } from '@/constants/theme';

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export default function CreateTripScreen() {
  const router = useRouter();
  const createTrip = useTripStore((state) => state.createTrip);
  const trip = useTripStore((state) => state.trip);

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleCreate = () => {
    createTrip(destination, formatDate(startDate), formatDate(endDate));
    router.push('/trip-route');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>New Journey</Text>
      <Text style={styles.title}>Create Trip</Text>

      <Text style={styles.label}>Destination</Text>
      <TextInput style={styles.input} value={destination} onChangeText={setDestination} placeholder="e.g. Paris" placeholderTextColor={Colors.gray} />

      <Text style={styles.label}>Start Date</Text>
      <Pressable style={styles.input} onPress={() => setShowStartPicker(true)}>
        <Text style={styles.dateText}>{formatDate(startDate)}</Text>
      </Pressable>
      {showStartPicker && (
        <View>
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            themeVariant="light"
            style={{ height: 180 }}
            onChange={(event, selectedDate) => {
              if (selectedDate) setStartDate(selectedDate);
              if (Platform.OS === 'android') setShowStartPicker(false);
            }}
          />
          {Platform.OS === 'ios' && (
            <Pressable style={styles.doneButton} onPress={() => setShowStartPicker(false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          )}
        </View>
      )}

      <Text style={styles.label}>End Date</Text>
      <Pressable style={styles.input} onPress={() => setShowEndPicker(true)}>
        <Text style={styles.dateText}>{formatDate(endDate)}</Text>
      </Pressable>
      {showEndPicker && (
        <View>
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            themeVariant="light"
            style={{ height: 180 }}
            onChange={(event, selectedDate) => {
              if (selectedDate) setEndDate(selectedDate);
              if (Platform.OS === 'android') setShowEndPicker(false);
            }}
          />
          {Platform.OS === 'ios' && (
            <Pressable style={styles.doneButton} onPress={() => setShowEndPicker(false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          )}
        </View>
      )}

      <Text style={styles.label}>Places to Visit</Text>
      {trip?.places.map((p) => (
        <Text key={p.id} style={styles.placeItem}>• {p.name} ({p.category})</Text>
      ))}
      <Pressable style={styles.outlineButton} onPress={() => router.push('/add-place')}>
        <Text style={styles.outlineButtonText}>+ Add Place</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Trip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.sand },
  eyebrow: { fontFamily: Fonts.bodyMedium, fontSize: 13, color: Colors.teal, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontFamily: Fonts.displayBold, fontSize: 28, color: Colors.navy, marginTop: Spacing.xs, marginBottom: Spacing.md },
  label: { fontFamily: Fonts.bodySemiBold, fontSize: 14, color: Colors.navy, marginTop: Spacing.md, marginBottom: Spacing.xs },
  input: { borderWidth: 1, borderColor: Colors.sand, borderRadius: Radius.md, padding: Spacing.md, fontFamily: Fonts.body, fontSize: 16, backgroundColor: Colors.white, color: Colors.navy },
  dateText: { fontFamily: Fonts.body, fontSize: 16, color: Colors.navy },
  placeItem: { fontFamily: Fonts.body, fontSize: 15, color: Colors.navy, marginTop: Spacing.xs },
  outlineButton: { borderWidth: 1, borderColor: Colors.teal, borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.sm },
  outlineButtonText: { fontFamily: Fonts.bodySemiBold, color: Colors.teal, textAlign: 'center' },
  button: { backgroundColor: Colors.saffron, padding: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.xl },
  buttonText: { fontFamily: Fonts.bodySemiBold, color: Colors.navy, textAlign: 'center', fontSize: 16 },
  doneButton: { backgroundColor: Colors.teal, padding: Spacing.sm, borderRadius: Radius.sm, marginTop: Spacing.xs },
  doneButtonText: { fontFamily: Fonts.bodySemiBold, color: Colors.white, textAlign: 'center' },
});