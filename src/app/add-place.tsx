import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTripStore } from '@/store/tripStore';

const CATEGORIES = [
  { key: 'museum', label: 'Museum' },
  { key: 'restaurant', label: 'Restaurant' },
  { key: 'beach', label: 'Beach' },
  { key: 'other', label: 'Other' },
] as const;

export default function AddPlaceScreen() {
  const router = useRouter();
  const addPlace = useTripStore((state) => state.addPlace);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]['key']>('museum');

  const handleAdd = () => {
    if (!name) return;
    addPlace({ id: Date.now().toString(), name, category });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Place Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Louvre Museum" />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.key}
            style={[styles.categoryChip, category === c.key && styles.categoryChipActive]}
            onPress={() => setCategory(c.key)}
          >
            <Text style={[styles.categoryText, category === c.key && styles.categoryTextActive]}>{c.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Place</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, color: '#000', backgroundColor: '#fff', marginTop: 4 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  categoryChip: { borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  categoryChipActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  categoryText: { color: '#000' },
  categoryTextActive: { color: '#fff' },
  button: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12, marginTop: 24 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});