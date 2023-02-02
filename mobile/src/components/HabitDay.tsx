import {
  TouchableOpacity,
  TouchableOpacityProps,
  Dimensions,
} from "react-native";
import clsx from "clsx";
import { generateProgressPorcentage } from "../utils/generate-progress-porcentage";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  availableHabits?: number;
  completedHabits?: number;
  date: Date;
}

export function HabitDay({
  availableHabits = 0,
  completedHabits = 0,
  date,
  ...rest
}: Props) {
  const today = dayjs().startOf("day").toDate();

  const isCurrentDay = dayjs(date).isSame(today);

  const accomplishedPorcentage =
    availableHabits > 0
      ? generateProgressPorcentage(availableHabits, completedHabits)
      : 0;

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className={clsx("m-1 border-2 rounded-lg", {
        ["bg-zinc-900 border-zinc-800"]: accomplishedPorcentage === 0,
        ["bg-violet-900 border-violed-700"]:
          accomplishedPorcentage > 0 && accomplishedPorcentage < 20,
        ["bg-violet-800 border-violed-600"]:
          accomplishedPorcentage >= 20 && accomplishedPorcentage < 40,
        ["bg-violet-700 border-violed-500"]:
          accomplishedPorcentage >= 40 && accomplishedPorcentage < 60,
        ["bg-violet-600 border-violed-500"]:
          accomplishedPorcentage >= 60 && accomplishedPorcentage < 80,
        ["bg-violet-500 border-violed-400"]: accomplishedPorcentage >= 80,
        ["border-white border-4"]: isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    ></TouchableOpacity>
  );
}
