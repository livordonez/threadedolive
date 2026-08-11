"use client";

import { useActionState, type ReactNode } from "react";
import {
  initialAdminActionState,
  type AdminFormAction,
} from "@/lib/admin-action-state";

export function AdminActionForm({
  action,
  children,
  className,
}: {
  action: AdminFormAction;
  children: ReactNode;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(
    action,
    initialAdminActionState,
  );

  return (
    <form action={formAction} className={className} aria-busy={pending}>
      {state.status === "error" ? <ActionError message={state.message} /> : null}
      <fieldset disabled={pending} className="contents">
        {children}
      </fieldset>
    </form>
  );
}

export function CreateActionForm({
  action,
  label,
}: {
  action: AdminFormAction;
  label: string;
}) {
  const [state, formAction, pending] = useActionState(
    action,
    initialAdminActionState,
  );

  return (
    <form action={formAction} className="space-y-2" aria-busy={pending}>
      <button disabled={pending} className="admin-button">
        {pending ? "Creating…" : label}
      </button>
      {state.status === "error" ? <ActionError message={state.message} compact /> : null}
    </form>
  );
}

export function DeleteActionButton({
  action,
  confirmMessage,
  children = "Delete",
}: {
  action: AdminFormAction;
  confirmMessage: string;
  children?: ReactNode;
}) {
  const [state, formAction, pending] = useActionState(
    action,
    initialAdminActionState,
  );

  return (
    <span className="ml-auto flex flex-col items-end gap-2">
      {state.status === "error" ? <ActionError message={state.message} compact /> : null}
      <button
        formAction={formAction}
        disabled={pending}
        onClick={(event) => {
          if (!confirm(confirmMessage)) event.preventDefault();
        }}
        className="text-sm font-semibold text-pimento-700 disabled:opacity-60"
      >
        {pending ? "Deleting…" : children}
      </button>
    </span>
  );
}

function ActionError({ message, compact = false }: { message: string; compact?: boolean }) {
  return (
    <p
      role="alert"
      aria-live="polite"
      className={compact
        ? "max-w-sm text-sm font-semibold text-pimento-700"
        : "rounded-2xl border border-pimento-700/20 bg-pimento-50 px-5 py-4 text-sm font-semibold text-pimento-700"}
    >
      {message}
    </p>
  );
}
