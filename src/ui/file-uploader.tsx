import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  isLoading?: boolean;
}

export function FileUploader({
  onFileSelect,
  accept = ".csv,.txt",
  maxSizeMB = 10,
  isLoading = false,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setIsDragging(false);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setError(null);
    
    // Check extension
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const acceptedExts = accept.split(",").map(a => a.trim().toLowerCase());
    if (!acceptedExts.includes(ext)) {
      setError(`Formato não suportado. Apenas: ${accept}`);
      return;
    }

    // Check size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`O arquivo excedeu o tamanho máximo de ${maxSizeMB}MB.`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isLoading && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
          isLoading ? "cursor-wait opacity-70" : "cursor-pointer"
        } ${
          isDragging
            ? "border-primary bg-primary/5"
            : error
            ? "border-destructive/50 bg-destructive/5 hover:border-destructive"
            : selectedFile
            ? "border-emerald-500/50 bg-emerald-50/50 hover:border-emerald-500"
            : "border-border bg-card hover:border-primary/50 hover:bg-muted/30"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={isLoading}
          className="hidden"
        />

        {isLoading ? (
          <>
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
            <p className="text-body font-semibold text-foreground">Processando arquivo...</p>
            <p className="mt-1 text-label text-muted-foreground">Isso pode levar alguns segundos.</p>
          </>
        ) : selectedFile && !error ? (
          <>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="text-body font-semibold text-foreground">{selectedFile.name}</p>
            <p className="mt-1 text-label text-muted-foreground tabular-nums">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Pronto para revisão
            </p>
          </>
        ) : (
          <>
            <div
              className={`mb-4 grid h-12 w-12 place-items-center rounded-full ${
                error ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
              }`}
            >
              {error ? <XCircle className="h-6 w-6" /> : <UploadCloud className="h-6 w-6" />}
            </div>
            <p className="text-body font-semibold text-foreground">
              {isDragging ? "Solte o arquivo aqui" : "Clique ou arraste um arquivo"}
            </p>
            <p className="mt-1 text-label text-muted-foreground">
              {error ? error : `ou clique para procurar no seu computador. Máximo de ${maxSizeMB}MB.`}
            </p>
            {!error && (
              <span className="mt-4 rounded-lg bg-primary px-4 py-2 text-label font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm">
                Selecionar arquivo
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
