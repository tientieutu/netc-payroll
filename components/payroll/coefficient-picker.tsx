"use client"

import { Plus, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Option } from "@/lib/payroll-config"

/**
 * A dynamic list of coefficient selections.
 * Each row picks one option; rows sum together.
 * Optionally constrained by maxItems and/or maxTotal.
 */
export function CoefficientPicker({
  label,
  options,
  values,
  onChange,
  maxItems,
  maxTotal,
}: {
  label: string
  options: Option[]
  values: number[]
  onChange: (next: number[]) => void
  maxItems?: number
  maxTotal?: number
}) {
  const total = values.reduce((a, b) => a + b, 0)

  const atItemLimit = maxItems != null && values.length >= maxItems

  const addRow = () => {
    if (atItemLimit) return
    onChange([...values, options[0]?.value ?? 0])
  }

  const updateRow = (idx: number, v: number) => {
    const next = [...values]
    next[idx] = v
    onChange(next)
  }

  const removeRow = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx))
  }

  const overTotal = maxTotal != null && total > maxTotal + 1e-9

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium text-slate-600">{label}</Label>
        <div className="flex items-center gap-2">
          <span
            className={
              overTotal
                ? "text-[11px] font-semibold text-red-600 tabular-nums"
                : "text-[11px] font-semibold text-indigo-600 tabular-nums"
            }
          >
            Σ = {total.toFixed(2)}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addRow}
            disabled={atItemLimit}
            className="h-7 gap-1 px-2 text-xs"
          >
            <Plus className="size-3" />
            Thêm
          </Button>
        </div>
      </div>

      {values.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-400">
          Chưa có mục nào. Nhấn &quot;Thêm&quot; để bổ sung.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {values.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Select
                value={String(val)}
                onValueChange={(v) => updateRow(idx, Number.parseFloat(v))}
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
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeRow(idx)}
                className="size-8 shrink-0 text-slate-400 hover:text-red-600"
                aria-label="Xóa mục"
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {overTotal ? (
        <p className="text-[11px] font-medium text-red-600">
          Tổng vượt giới hạn cho phép ({maxTotal?.toFixed(2)}). Vui lòng điều
          chỉnh.
        </p>
      ) : null}
      {maxItems != null ? (
        <p className="text-[11px] text-slate-400">
          Tối đa {maxItems} mục.
        </p>
      ) : null}
    </div>
  )
}
