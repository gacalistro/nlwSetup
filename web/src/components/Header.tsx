import * as Dialog from "@radix-ui/react-dialog";

import LogoImage from "../assets/logo.svg";

import { Plus, X } from "phosphor-react";
import { NewHabitForm } from "./NewHabitForm";

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={LogoImage} alt="Habits Logo" />

      <Dialog.Root>
        <Dialog.Trigger className="border border-violet-500 rounded-lg px-6 py-4 font-semibold flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-background">
          <Plus size={20} className="text-violet-500" />
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/60 fixed inset-0" />
          <Dialog.Content className="absolute w-full max-w-md p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-2xl">
            <Dialog.Title className="font-extrabold text-3xl leading-tight">
              Criar hábito
            </Dialog.Title>

            <Dialog.Close className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:rounded-md">
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
