import { FormEvent, useState } from "react";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";

import { Checkbox } from "./Checkbox";

const allWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || checkedWeekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title,
      weekDays: checkedWeekDays,
    });

    setTitle("");
    setCheckedWeekDays([]);
    alert("Hábito criado!");
  }

  function handleToggleWeekDay(index: number) {
    checkedWeekDays.includes(index)
      ? setCheckedWeekDays((prevState) =>
          prevState.filter((weekDay) => weekDay !== index)
        )
      : setCheckedWeekDays((prevState) => [...prevState, index]);
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Exercícios, dormir bem, etc..."
        autoFocus
        value={title}
        className="mt-3 p-4 bg-zinc-800 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900"
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="mt-4 font-semibold leading-tight">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {allWeekDays.map((weekDay, index) => (
          <Checkbox
            onCheckedChange={() => handleToggleWeekDay(index)}
            checked={checkedWeekDays.includes(index)}
            key={weekDay}
            title={weekDay}
          />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 py-4 flex items-center justify-center gap-3 bg-green-600 rounded-lg font-semibold hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
