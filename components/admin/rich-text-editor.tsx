"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { encodeRichText } from "@/lib/rich-text-format";

type FormatCommand = "bold" | "italic" | "underline" | "insertUnorderedList";

const controls: Array<{
  command: FormatCommand;
  label: string;
  shortLabel: string;
}> = [
  { command: "bold", label: "Bold", shortLabel: "B" },
  { command: "italic", label: "Italic", shortLabel: "I" },
  { command: "underline", label: "Underline", shortLabel: "U" },
  { command: "insertUnorderedList", label: "Bulleted list", shortLabel: "• List" },
];

export function RichTextEditor({
  initialHtml,
  name,
  label,
  placeholder,
}: {
  initialHtml: string;
  name: string;
  label: string;
  placeholder: string;
}) {
  const editor = useRef<HTMLDivElement>(null);
  const hiddenInput = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();
  const [active, setActive] = useState<Partial<Record<FormatCommand, boolean>>>({});

  const syncValue = useCallback(() => {
    if (hiddenInput.current) {
      hiddenInput.current.value = encodeRichText(editor.current?.innerHTML ?? "");
    }
  }, []);

  const updateActiveFormats = useCallback(() => {
    const selection = document.getSelection();
    const anchor = selection?.anchorNode;
    if (!anchor || !editor.current?.contains(anchor)) return;

    setActive(Object.fromEntries(
      controls.map(({ command }) => [command, document.queryCommandState(command)]),
    ));
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => document.removeEventListener("selectionchange", updateActiveFormats);
  }, [updateActiveFormats]);

  function format(command: FormatCommand) {
    editor.current?.focus();
    document.execCommand(command);
    syncValue();
    updateActiveFormats();
  }

  return (
    <div className="md:col-span-2">
      <label id={`${name}-label`} className="admin-label">{label}</label>
      <input
        ref={hiddenInput}
        type="hidden"
        name={name}
        defaultValue={encodeRichText(initialHtml)}
      />
      <div className="mt-2 overflow-hidden rounded-xl border border-olive-900/15 bg-white focus-within:border-olive-700/50 focus-within:ring-2 focus-within:ring-olive-700/10">
        <div
          role="toolbar"
          aria-label={`${label} formatting`}
          className="flex flex-wrap gap-1 border-b border-olive-900/10 bg-linen-50 px-2 py-2"
        >
          {controls.map(({ command, label: controlLabel, shortLabel }) => (
            <button
              key={command}
              type="button"
              disabled={pending}
              aria-label={controlLabel}
              aria-pressed={Boolean(active[command])}
              title={controlLabel}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => format(command)}
              className={`min-h-10 min-w-10 rounded-lg border px-3 text-sm text-olive-900 transition-colors ${
                active[command]
                  ? "border-olive-700/30 bg-olive-100"
                  : "border-transparent hover:border-olive-900/10 hover:bg-white"
              }`}
            >
              <span
                className={command === "italic" ? "italic" : command === "underline" ? "underline" : command === "bold" ? "font-extrabold" : "font-semibold"}
                aria-hidden="true"
              >
                {shortLabel}
              </span>
            </button>
          ))}
        </div>
        <div
          ref={editor}
          contentEditable={!pending}
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-disabled={pending}
          aria-labelledby={`${name}-label`}
          data-placeholder={placeholder}
          onInput={syncValue}
          onBlur={syncValue}
          className="admin-rich-text min-h-80 px-4 py-3 font-normal text-charcoal-900 outline-none"
          dangerouslySetInnerHTML={{ __html: initialHtml }}
        />
      </div>
      <p className="admin-help mt-2">Select text, then choose a formatting button. Press Enter twice to finish a list.</p>
    </div>
  );
}
