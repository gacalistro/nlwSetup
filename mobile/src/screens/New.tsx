import { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { GoBackButton } from "../components/GoBackButton";
import { Checkbox } from "../components/Checkbox";

import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const weekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  function handleToggleWeekDay(weekDayIndex: number) {
    if (checkedWeekDays.includes(weekDayIndex)) {
      setCheckedWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setCheckedWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || checkedWeekDays.length === 0) {
        return Alert.alert(
          "Novo Hábito",
          "Informe o nome do hábito e escolha a recorrência."
        );
      }

      await api.post("/habits", {
        title,
        weekDays: checkedWeekDays,
      });

      setTitle("");
      setCheckedWeekDays([]);

      Alert.alert("Novo Hábito", "Criado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível criar o hábito.");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <GoBackButton />

        <Text className="mt-4 text-3xl text-white font-extrabold leading-tight">
          Criar hábito
        </Text>

        <Text className="mt-6 text-base text-white font-semibold leading-tight">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="mt-3 p-4 bg-zinc-900 rounded-lg border-2 border-zinc-800 focus:border-green-600 text-white"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          autoFocus
          onChangeText={setTitle}
          value={title}
        ></TextInput>

        <Text className="mt-4 mb-3 text-base text-white font-semibold leading-tight">
          Qual sua recorrência?
        </Text>

        {weekDays.map((weekDay, i) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={checkedWeekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
          />
        ))}

        <TouchableOpacity
          onPress={handleCreateNewHabit}
          activeOpacity={0.7}
          className="w-full mt-6 py-4 flex-row items-center justify-center bg-green-600 rounded-lg"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="ml-3 text-white text-base font-semibold leading-tight">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
