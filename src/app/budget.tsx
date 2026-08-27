import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useTripStore } from '@/store/tripStore';
import { Colors, Fonts, Spacing, Radius } from '@/constants/theme';

export default function BudgetScreen() {
  const trip = useTripStore((state) => state.trip);
  const setTotalBudget = useTripStore((state) => state.setTotalBudget);
  const addExpense = useTripStore((state) => state.addExpense);

  const [budgetInput, setBudgetInput] = useState('');
  const [expenseNote, setExpenseNote] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  if (!trip) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No trip yet. Create one first.</Text>
      </View>
    );
  }

  const spent = trip.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = trip.totalBudget - spent;

  const handleAddExpense = () => {
    if (!expenseNote || !expenseAmount) return;
    addExpense({ id: Date.now().toString(), category: 'other', amount: parseFloat(expenseAmount), note: expenseNote });
    setExpenseNote('');
    setExpenseAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{trip.destination}</Text>
      <Text style={styles.title}>Budget</Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Spent</Text>
          <Text style={styles.summaryValue}>{spent} / {trip.totalBudget}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text style={[styles.summaryValue, { color: remaining < 0 ? '#C0392B' : Colors.teal }]}>{remaining}</Text>
        </View>
      </View>

      <Text style={styles.label}>Total Budget</Text>
      <TextInput
        style={styles.input}
        value={budgetInput}
        onChangeText={setBudgetInput}
        placeholder="e.g. 1000"
        placeholderTextColor={Colors.gray}
        keyboardType="numeric"
        onEndEditing={() => setTotalBudget(parseFloat(budgetInput) || 0)}
      />

      <Text style={styles.label}>Add Expense</Text>
      <TextInput style={styles.input} value={expenseNote} onChangeText={setExpenseNote} placeholder="e.g. Dinner" placeholderTextColor={Colors.gray} />
      <TextInput style={[styles.input, { marginTop: Spacing.xs }]} value={expenseAmount} onChangeText={setExpenseAmount} placeholder="Amount" placeholderTextColor={Colors.gray} keyboardType="numeric" />
      <Pressable style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </Pressable>

      <FlatList
        data={trip.expenses}
        keyExtractor={(item) => item.id}
        style={{ marginTop: Spacing.lg }}
        renderItem={({ item }) => (
          <View style={styles.expenseRow}>
            <Text style={styles.expenseNote}>{item.note}</Text>
            <Text style={styles.expenseAmount}>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.sand },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.paper },
  emptyText: { fontFamily: Fonts.body, fontSize: 16, color: Colors.gray },
  eyebrow: { fontFamily: Fonts.bodyMedium, fontSize: 13, color: Colors.teal, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontFamily: Fonts.displayBold, fontSize: 28, color: Colors.navy, marginTop: Spacing.xs, marginBottom: Spacing.md },
  summaryCard: { backgroundColor: Colors.teal, borderWidth: 1, borderColor: Colors.sand, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.xs },
  summaryLabel: { fontFamily: Fonts.bodySemiBold, color: Colors.navy , fontSize: 16},
  summaryValue: { fontFamily: Fonts.bodySemiBold, color: Colors.navy, fontSize: 16 },
  label: { fontFamily: Fonts.bodySemiBold, fontSize: 14, color: Colors.navy, marginTop: Spacing.md, marginBottom: Spacing.xs },
  input: { borderWidth: 1, borderColor: Colors.sand, borderRadius: Radius.md, padding: Spacing.md, fontFamily: Fonts.body, fontSize: 16, color: Colors.navy, backgroundColor: Colors.white },
  button: { backgroundColor: Colors.saffron, padding: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.md },
  buttonText: { fontFamily: Fonts.bodySemiBold, color: Colors.navy, textAlign: 'center', fontSize: 16 },
  expenseRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.sand },
  expenseNote: { fontFamily: Fonts.body, color: Colors.navy },
  expenseAmount: { fontFamily: Fonts.bodySemiBold, color: Colors.navy },
});