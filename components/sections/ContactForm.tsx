"use client";

import { Send } from "lucide-react";
import type { ReactNode } from "react";
import { PROJECT_TYPES } from "@/lib/core/validation";
import { IS_STATIC_EXPORT, useContactForm } from "@/hooks/useContactForm";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-card border border-border-default bg-surface-card px-4 py-3 text-lede resize-none";

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-small-lg font-semibold">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-small mt-1 text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const {
    register,
    errors,
    formError,
    isSubmitting,
    result,
    selectedTypes,
    toggleProjectType,
    action,
  } = useContactForm();

  return (
    <form action={action} noValidate>
      <div className="flex flex-col gap-4">
        <Field label="Name" id="name" error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClasses}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClasses}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>
        <Field label="Subject" id="subject" error={errors.subject}>
          <input
            id="subject"
            type="text"
            className={inputClasses}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            {...register("subject")}
          />
        </Field>
        <div>
          <p className="text-small-lg font-semibold">Project Type</p>
          <div
            role="group"
            aria-label="Project type"
            aria-describedby={errors.projectTypes ? "projectTypes-error" : undefined}
            className="mt-1.5 flex flex-wrap gap-2"
          >
            {PROJECT_TYPES.map((type) => {
              const active = selectedTypes.has(type);
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleProjectType(type)}
                  className={`rounded-pill text-small border px-3 py-1.5 font-medium transition-colors ${
                    active
                      ? "border-action bg-action text-on-action"
                      : "border-border-default bg-surface-card text-text-muted hover:border-action"
                  }`}
                >
                  {type}
                </button>
              );
            })}
            {[...selectedTypes].map((type) => (
              <input key={type} type="hidden" name="projectTypes" value={type} />
            ))}
          </div>
          {errors.projectTypes ? (
            <p id="projectTypes-error" role="alert" className="text-small mt-1 text-red-600">
              {errors.projectTypes}
            </p>
          ) : null}
        </div>
        <Field label="Message" id="message" error={errors.message}>
          <textarea
            id="message"
            rows={5}
            className={inputClasses}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
        </Field>
        {/* Honeypot — hidden from users, tempting for bots */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-6">
        <Send className="size-4" aria-hidden />
        {isSubmitting ? "Sending…" : "Send"}
      </Button>

      <div aria-live="polite" className="mt-4">
        {result?.ok ? (
          <p className="text-small-lg text-action font-semibold">
            {IS_STATIC_EXPORT
              ? "Your email app should have opened with the message ready — just press send."
              : "Thanks — we'll reply within 24 hours."}
          </p>
        ) : null}
        {formError ? (
          <p role="alert" className="text-small-lg text-red-600">
            {formError}
          </p>
        ) : null}
      </div>
    </form>
  );
}
