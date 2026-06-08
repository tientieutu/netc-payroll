"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Option } from "@/lib/payroll-config"

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="text-xs font-medium text-slate-600">{label}</Label>
      {children}
      {hint ? <p className="text-[11px] text-slate-400">{hint}</p> : null}
    </div>
  )
}

export function NumberField({
  label,
  hint,
  value,
  onChange,
  step,
  suffix,
  className,
}: {
  label: string
  hint?: string
  value: number
  onChange: (v: number) => void
  step?: number
  suffix?: string
  className?: string
}) {
  return (
    <Field label={label} hint={hint} className={className}>
      <div className="relative">
        <Input
          type="number"
          inputMode="decimal"
          step={step ?? "any"}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
          className="bg-white tabular-nums"
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            {suffix}
          </span>
        ) : null}
      </div>
    </Field>
  )
}

export function SelectField({
  label,
  hint,
  value,
  onChange,
  options,
  className,
}: {
  label: string
  hint?: string
  value: number
  onChange: (v: number) => void
  options: Option[]
  className?: string
}) {
  return (
    <Field label={label} hint={hint} className={className}>
      <Select
        value={String(value)}
        onValueChange={(v) => onChange(Number.parseFloat(v))}
      >
        <SelectTrigger className="bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o, i) => (
            <SelectItem key={`${o.value}-${i}`} value={String(o.value)}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}
