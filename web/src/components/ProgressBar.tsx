interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="mt-4 w-full h-3 bg-zinc-700 rounded-xl">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados neste dia"
        aria-valuenow={props.progress}
        className="h-3 bg-violet-600 rounded-xl transition-all"
        style={{ width: `${props.progress}%` }}
      ></div>
    </div>
  );
}
