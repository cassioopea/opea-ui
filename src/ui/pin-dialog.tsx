import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/ui/dialog";
import { CheckCircle2, ShieldCheck, XCircle, Delete } from "lucide-react";
import { cn } from "@/lib/utils";

type PinDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function PinDialog({
  open,
  onOpenChange,
  onSuccess,
  title = "Assinatura Eletrônica",
  description = "Digite seu PIN de 6 dígitos para confirmar e assinar a operação.",
}: PinDialogProps) {
  const demoPin = [1, 2, 3, 4, 5, 6];
  const [clickedButtons, setClickedButtons] = useState<number[][]>([]);
  const [pairs, setPairs] = useState<number[][]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (open) {
      const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const shuffled = shuffleArray(digits);
      const newPairs: number[][] = [];
      for (let i = 0; i < shuffled.length; i += 2) {
        newPairs.push([shuffled[i], shuffled[i + 1]]);
      }
      setPairs(newPairs);
      setClickedButtons([]);
      setStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  const handleKeyPress = (pair: number[]) => {
    if (status === "loading" || status === "success") return;
    if (clickedButtons.length >= 6) return;
    setClickedButtons((prev) => [...prev, pair]);
    setErrorMessage("");
  };

  const handleClear = () => {
    if (status === "loading" || status === "success") return;
    if (clickedButtons.length === 0) return;
    setClickedButtons((prev) => prev.slice(0, -1));
    setErrorMessage("");
  };

  const handleConfirm = () => {
    if (clickedButtons.length !== 6) return;
    setStatus("loading");

    setTimeout(() => {
      const isValid = demoPin.every((digit, idx) => {
        const clickedPair = clickedButtons[idx];
        return clickedPair && clickedPair.includes(digit);
      });

      if (isValid) {
        setStatus("success");
        setTimeout(() => {
          onSuccess();
          onOpenChange(false);
        }, 1500);
      } else {
        setStatus("error");
        setErrorMessage("PIN inválido. Tente novamente.");
        setClickedButtons([]);
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shuffled = shuffleArray(digits);
        const newPairs: number[][] = [];
        for (let i = 0; i < shuffled.length; i += 2) {
          newPairs.push([shuffled[i], shuffled[i + 1]]);
        }
        setPairs(newPairs);
      }
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => status !== "loading" && onOpenChange(v)}>
      <DialogContent className="max-w-sm gap-0 border border-pin-modal-border p-0 sm:rounded-3xl overflow-hidden bg-pin-modal shadow-elevated">
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-surface to-primary p-8 text-center">
          <h3 className="text-primary-foreground font-semibold text-lg tracking-tight">{title}</h3>
          <p className="text-primary-foreground/60 text-sm mt-1 font-medium">
            Autorize a transação com sua senha
          </p>
        </div>

        {/* Body */}
        <div className="p-6 text-center space-y-6">
          {status === "success" ? (
            <div className="py-8 space-y-3 flex flex-col items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-pin-modal-success/20 text-pin-modal-success animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h4 className="text-heading font-semibold text-pin-modal-foreground">
                Operação Assinada!
              </h4>
              <p className="text-label text-pin-modal-muted font-medium">
                PIN validado com sucesso.
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-label text-pin-modal-muted leading-relaxed">{description}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted/40 px-3 py-1 text-caption font-medium text-pin-modal-foreground border border-pin-modal-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  PIN demonstrativo: <span className="font-semibold underline">123456</span>
                </div>
              </div>

              {/* PIN Dots */}
              <div className="flex justify-center gap-4 py-4">
                {Array.from({ length: 6 }).map((_, idx) => {
                  const hasInput = idx < clickedButtons.length;
                  const isActive = idx === clickedButtons.length && status !== "loading";
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border-2 transition-all duration-200",
                        hasInput
                          ? "bg-pin-modal-foreground border-pin-modal-foreground"
                          : isActive
                            ? "border-primary bg-background animate-pulse"
                            : "border-border bg-background",
                      )}
                    />
                  );
                })}
              </div>

              {/* Error messages */}
              {errorMessage && (
                <div className="flex items-center justify-center gap-2 text-caption text-destructive bg-pin-modal-destructive-subtle border border-destructive/20 rounded-xl py-2.5 px-4 animate-shake">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Shuffled Pair Keypad — 2-column grid */}
              <div className="grid grid-cols-2 gap-3">
                {pairs.map((pair, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={status === "loading"}
                    onClick={() => handleKeyPress(pair)}
                    className="group flex items-center justify-center gap-2 py-4 rounded-2xl bg-pin-modal-keypad border border-pin-modal-border shadow-sm hover:bg-pin-modal-keypad-hover hover:scale-[1.02] active:scale-95 transition-all cursor-pointer select-none disabled:pointer-events-none"
                  >
                    <span className="text-xl font-bold text-pin-modal-foreground">{pair[0]}</span>
                    <span className="text-caption text-pin-modal-muted font-medium uppercase tracking-widest">
                      ou
                    </span>
                    <span className="text-xl font-medium text-pin-modal-muted">{pair[1]}</span>
                  </button>
                ))}

                {/* Backspace Button */}
                <button
                  type="button"
                  disabled={status === "loading" || clickedButtons.length === 0}
                  onClick={handleClear}
                  className="group flex items-center justify-center py-4 rounded-2xl bg-muted/40 border border-pin-modal-border shadow-sm hover:bg-muted/60 active:scale-95 transition-all cursor-pointer select-none disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Delete className="h-5 w-5 text-pin-modal-muted group-hover:text-pin-modal-foreground transition-colors" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  disabled={status === "loading" || clickedButtons.length !== 6}
                  onClick={handleConfirm}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-label shadow-lg shadow-primary/10 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45 disabled:pointer-events-none"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-primary-foreground mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Avaliando...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Confirmar
                    </>
                  )}
                </button>
                <button
                  type="button"
                  disabled={status === "loading"}
                  onClick={() => onOpenChange(false)}
                  className="w-full py-3 rounded-2xl text-label font-semibold text-pin-modal-muted hover:text-pin-modal-foreground hover:bg-muted/40 transition-colors cursor-pointer disabled:pointer-events-none"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
