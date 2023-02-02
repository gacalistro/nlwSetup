import { useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import * as Popover from "@radix-ui/react-popover";

import { ProgressBar } from "./ProgressBar";
import { HabitsList } from "./HabitsList";

interface HabitDayProps {
  date: Date;
  available?: number;
  defaultCompleted?: number;
}

export function HabitDay({
  date,
  available = 0,
  defaultCompleted = 0,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const progressPorcentage =
    available > 0 ? Math.round((completed / available) * 100) : 0;

  const weekDay = dayjs(date).format("dddd");
  const dayAndMonth = dayjs(date).format("DD/MM");

  function handleCompletedChange(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-900 border-zinc-800": progressPorcentage === 0,
            "bg-violet-900 border-violet-700":
              progressPorcentage > 0 && progressPorcentage < 20,
            "bg-violet-800 border-violet-600":
              progressPorcentage >= 20 && progressPorcentage < 40,
            "bg-violet-700 border-violet-500":
              progressPorcentage >= 40 && progressPorcentage < 60,
            "bg-violet-600 border-violet-500":
              progressPorcentage >= 60 && progressPorcentage < 80,
            "bg-violet-500 border-violet-400": progressPorcentage >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 flex flex-col bg-zinc-900 rounded-2xl">
          <Popover.Arrow height={10} width={20} className="fill-zinc-900" />

          <span className="text-zinc-400 font-semibold">{weekDay}</span>
          <span className="mt-2 text-3xl font-extrabold leading-tight">
            {dayAndMonth}
          </span>

          <ProgressBar progress={progressPorcentage} />

          <HabitsList date={date} onCompletedChange={handleCompletedChange} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
