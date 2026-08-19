"use client";

import {
  defaultMomentFont,
  momentFontFamily,
  momentFontOptions,
  normalizeMomentFont,
} from "@/lib/moment-fonts";

export function MomentFontSelect({
  name,
  label,
  defaultValue,
  help,
}: {
  name: "title_font" | "body_font";
  label: string;
  defaultValue?: string | null;
  help?: string;
}) {
  const selected = normalizeMomentFont(defaultValue ?? defaultMomentFont);

  return (
    <label className="admin-label">
      {label}
      <select
        name={name}
        defaultValue={selected}
        className="admin-input mt-2"
        style={{ fontFamily: momentFontFamily(selected) }}
      >
        {momentFontOptions.map((option) => (
          <option
            key={option.slug}
            value={option.slug}
            style={{ fontFamily: momentFontFamily(option.slug) }}
          >
            {option.label}
          </option>
        ))}
      </select>
      {help ? <span className="admin-help mt-2 block">{help}</span> : null}
    </label>
  );
}
