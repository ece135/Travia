import { useTripStore } from "@/store/tripStore";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function BudgetScreen() {
  const trip = useTripStore((state) => state.trip);
  const setTotalBudget = useTripStore((state) => state.setTotalBudget);
  const addExpense = useTripStore((state) => state.addExpense);

  const [budgetInput, setBudgetInput] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

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
    addExpense({
      id: Date.now().toString(),
      category: "other",
      amount: parseFloat(expenseAmount),
      note: expenseNote,
    });
    setExpenseNote("");
    setExpenseAmount("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Budget</Text>
      <TextInput
        style={styles.input}
        value={budgetInput}
        onChangeText={setBudgetInput}
        placeholder="e.g. 1000"
        keyboardType="numeric"
        onEndEditing={() => setTotalBudget(parseFloat(budgetInput) || 0)}
      />

      <Text style={styles.summary}>
        Spent: {spent} / {trip.totalBudget}
      </Text>
      <Text style={styles.summary}>Remaining: {remaining}</Text>

      <Text style={styles.label}>Add Expense</Text>
      <TextInput
        style={styles.input}
        value={expenseNote}
        onChangeText={setExpenseNote}
        placeholder="e.g. Dinner"
      />
      <TextInput
        style={styles.input}
        value={expenseAmount}
        onChangeText={setExpenseAmount}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <Pressable style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </Pressable>

      <FlatList
        data={trip.expenses}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <Text style={styles.expenseItem}>
            {item.note} — {item.amount}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#666" },
  label: { fontSize: 14, fontWeight: "600", marginTop: 16, color: "#000" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
    marginTop: 4,
  },
  summary: { fontSize: 16, fontWeight: "600", marginTop: 8, color: "#000" },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  expenseItem: { fontSize: 15, color: "#000", paddingVertical: 4 },
});
