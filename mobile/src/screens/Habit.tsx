import { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { api } from "../lib/axios";
import dayjs from "dayjs";
import clsx from "clsx";

import { GoBackButton } from "../components/GoBackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { generateProgressPorcentage } from "../utils/generate-progress-porcentage";
import { HabitsEmpty } from "../components/HabitsEmpty";

interface Params {
  date: string;
}

interface DayInfoProps {
  availableHabits: {
    id: string;
    title: string;
  }[];
  completedHabits: string[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();

  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDayInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = dayInfo?.availableHabits.length
    ? generateProgressPorcentage(
        dayInfo.availableHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", { params: { date } });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToogleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((id) => id !== habitId)
        );
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível atualizar o progresso do hábito.");
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <GoBackButton />

        <Text className="mt-4 text-zinc-400 text-base font-semibold leading-none">
          {dayOfWeek}
        </Text>

        <Text className="mt-2 text-white text-3xl font-extrabold leading-tight">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", { ["opacity-50"]: isDayInPast })}>
          {dayInfo?.availableHabits ? (
            dayInfo?.availableHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToogleHabit(habit.id)}
                disabled={isDayInPast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isDayInPast && (
          <Text className="text-zinc-400 mt-10 text-center">
            Você não pode editar o progresso de dias anteriores.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
