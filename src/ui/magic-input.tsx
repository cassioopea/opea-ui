import { useRef, useState } from "react";
import { Sparkles, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MagicInputProps {
  /** Controlled value (optional). Falls back to internal state when omitted. */
  value?: string;
  /** Fires on every keystroke/paste with the raw text. */
  onValueChange?: (text: string) => void;
  /** Fires when a file is dropped onto the field. */
  onFile?: (file: File) => void;
  placeholder?: string;
  className?: string;
}

/**
 * A stylized "smart paste" field with a drop zone. It is intentionally
 * **agnostic**: it emits the raw text (`onValueChange`) and dropped files
 * (`onFile`) and knows nothing about boleto/Pix/CNAB or any business format —
 * that detection belongs in the consuming app, not in the design system.
 */
export function MagicInput({
  value,
  onValueChange,
  onFile,
  placeholder,
  className,
}: MagicInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [internal, setInternal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const text = value ?? internal;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave" || e.type === "drop") setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile?.(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternal(e.target.value);
    onValueChange?.(e.target.value);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border-2 shadow-xs transition-all duration-300 ease-out",
        isDragging
          ? "border-dashed border-primary bg-primary/5 scale-[1.02]"
          : "border-solid border-border/60 bg-card",
        className,
      )}
    >
      <div className="flex h-[72px] items-center gap-4 px-6">
        <div
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors",
            isDragging ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
          )}
        >
          {isDragging ? <UploadCloud className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          placeholder={isDragging ? "Solte o arquivo aqui..." : placeholder}
          className={cn(
            "flex-1 bg-transparent text-subheading font-medium outline-none transition-all placeholder:text-muted-foreground/70",
            isDragging ? "pointer-events-none opacity-80" : "opacity-100",
          )}
        />
      </div>
    </div>
  );
}
