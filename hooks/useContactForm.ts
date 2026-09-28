"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, PROJECT_TYPES } from "@/lib/core/validation";
import type { ContactInput } from "@/lib/core/validation";
import { submitContactAction } from "@/app/actions/contact";
import type { ActionState } from "@/app/actions/contact";
import { ORG_JSONLD } from "@/lib/data/seo";

const FIELDS = ["name", "email", "subject", "projectTypes", "message"] as const;
type FieldName = (typeof FIELDS)[number];

/** True when the build targets static hosting (GitHub Pages) — no server
 * actions there, so the form falls back to a prefilled email draft. */
export const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/** Static-host fallback: validate client-side with the same schema, then open
 * the visitor's email client with the message prefilled. */
function mailtoAction(_prev: ActionState | null, formData: FormData): ActionState {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    subject: formData.get("subject") ?? "",
    projectTypes: formData.getAll("projectTypes"),
    message: formData.get("message") ?? "",
    company: formData.get("company") ?? "",
  });
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_form");
      (errors[key] ??= []).push(issue.message);
    }
    return { ok: false, errors };
  }
  const { name, email, subject, projectTypes, message } = parsed.data;
  const mailto =
    `mailto:${ORG_JSONLD.email}` +
    `?subject=${encodeURIComponent(`[Website] ${subject}`)}` +
    `&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${projectTypes.join(", ")}\n\n${message}`,
    )}`;
  window.location.href = mailto;
  return { ok: true };
}

/** RHF gives { type, message? } objects, the server gives string[] — normalize to one message. */
function firstMessage(error: unknown): string | undefined {
  if (!error) return undefined;
  if (Array.isArray(error)) return error[0];
  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return undefined;
}

export function useContactForm() {
  const [result, formAction, isPending] = useActionState<ActionState | null, FormData>(
    IS_STATIC_EXPORT ? mailtoAction : submitContactAction,
    null,
  );

  const form = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", subject: "", projectTypes: [], message: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // RHF owns the selection so form.reset() clears it together with the fields.
  const selectedTypes = new Set(form.watch("projectTypes"));

  function toggleProjectType(type: (typeof PROJECT_TYPES)[number]) {
    const next = new Set(selectedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    form.setValue("projectTypes", [...next] as ContactInput["projectTypes"], {
      shouldValidate: true,
    });
  }

  useEffect(() => {
    if (result?.ok) form.reset();
  }, [result, form]);

  const serverErrors = result && !result.ok ? result.errors : {};
  const { errors: rhfErrors, dirtyFields } = form.formState;
  const errors: Partial<Record<FieldName, string>> = {};
  for (const field of FIELDS) {
    const live = firstMessage(rhfErrors[field]);
    // Server errors show until the user edits that field (then live validation takes over).
    const stale = dirtyFields[field];
    const server = stale ? undefined : firstMessage(serverErrors[field]);
    errors[field] = live ?? server;
  }
  const formError = firstMessage(serverErrors._form);

  return {
    register: form.register,
    errors,
    formError,
    isSubmitting: form.formState.isSubmitting || isPending,
    result,
    selectedTypes,
    toggleProjectType,
    action: formAction,
  };
}
