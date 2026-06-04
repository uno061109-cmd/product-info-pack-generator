import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint && <span className="ml-2 text-xs text-slate-500">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="focus-ring w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink shadow-sm placeholder:text-slate-400"
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="focus-ring min-h-28 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink shadow-sm placeholder:text-slate-400"
    />
  );
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="focus-ring w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink shadow-sm"
    />
  );
}

type CheckboxGroupProps = {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
  function toggle(value: string) {
    onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`focus-ring rounded-lg border px-3 py-2 text-sm font-medium transition ${
              active
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-line bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
