import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
  availableHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const isDayInPast = dayjs(date).endOf("day").isBefore(new Date());

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitsInfo(response.data));
  }, []);

  async function handleToggleHabit(habitId: string) {
    const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId);

    await api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      availableHabits: habitsInfo!.availableHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.availableHabits.map((habit) => (
        <Checkbox
          key={habit.id}
          title={habit.title}
          titleBold
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDayInPast}
          onCheckedChange={() => handleToggleHabit(habit.id)}
        />
      ))}
    </div>
  );
}
