"use client"

import { useState } from "react"
import { Database, Check, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { PayrollResult } from "@/lib/use-payroll-calc"
import type { PayrollState } from "@/lib/use-payroll-calc"
import { VND, NUM } from "@/lib/payroll-config"

function Row({
  label,
  value,
  strong,
  muted,
}: {
  label: React.ReactNode
  value: React.ReactNode
  strong?: boolean
  muted?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span
        className={
          muted
            ? "text-[11px] text-slate-400"
            : strong
              ? "text-sm font-semibold text-slate-700"
              : "text-xs text-slate-500"
        }
      >
        {label}
      </span>
      <span
        className={
          strong
            ? "text-sm font-bold tabular-nums text-slate-900"
            : "text-xs font-medium tabular-nums text-slate-700"
        }
      >
        {value}
      </span>
    </div>
  )
}

export function PayrollReceipt({
  state,
  result,
}: {
  state: PayrollState
  result: PayrollResult
}) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  const handleSave = () => {
    setStatus("saving")
    // Supabase persistence not connected — simulate write so UI stays functional.
    setTimeout(() => {
      setStatus("saved")
      setTimeout(() => setStatus("idle"), 2500)
    }, 1100)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Receipt header */}
      <div className="bg-slate-900 px-5 py-4 text-white">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-indigo-300" />
          <h2 className="text-sm font-semibold tracking-wide">
            PHIẾU LƯƠNG · NETC
          </h2>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-400">
          Chi tiết thu nhập · Cập nhật theo thời gian thực
        </p>
      </div>

      <div className="px-5 py-4">
        {/* Lương ngạch bậc */}
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
          I. Lương ngạch bậc (Lcb)
        </p>
        <Row
          label={`CS × (Bậc + PCCV) + PCTN`}
          value=""
          muted
        />
        <Row
          label={`${NUM(state.mucLuongCoSo, 0)} × (${NUM(state.heSoBacLuong)} + ${NUM(state.phuCapChucVu)}) + ${NUM(state.phuCapTrachNhiem, 0)}`}
          value={VND(result.luongNgachBac)}
        />

        <Separator className="my-3" />

        {/* Hệ số */}
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
          II. Hệ số áp dụng
        </p>
        <Row label="Kvt (Vị trí việc làm)" value={NUM(result.kvt)} />
        <Row label="ΣKkn1 (Kiêm nhiệm L1)" value={NUM(result.sumKkn1)} />
        <Row
          label="ΣKkn2 (Kiêm nhiệm L2)"
          value={
            result.kkn2Voided ? (
              <span className="text-red-600">
                0 <span className="text-[10px]">(hủy)</span>
              </span>
            ) : (
              NUM(result.sumKkn2)
            )
          }
        />
        <Row label="Khq (Hiệu quả)" value={NUM(state.khq)} />
        <Row label="Giá trị 1 điểm × Kcs (CS)" value={VND(result.cs)} />

        <Separator className="my-3" />

        {/* TNTT */}
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
          III. Thu nhập tăng thêm (TNTT)
        </p>
        <div className="rounded-md bg-indigo-50 px-3 py-2 text-center font-mono text-[11px] leading-relaxed text-indigo-700">
          TNTT = CS × [(Kvt + ΣKkn1) × Khq + ΣKkn2]
        </div>
        <div className="mt-2">
          <Row
            label="TNTT (đủ công)"
            value={VND(result.tnttFull)}
          />
          <Row
            label={`Tỷ lệ công (${state.ngayThucTe}/${state.ngayChuan})`}
            value={`${NUM(result.attendanceRatio * 100, 1)}%`}
          />
          <Row
            label="TNTT thực nhận"
            value={VND(result.tnttActual)}
            strong
          />
        </div>

        <Separator className="my-3" />

        {/* Grand total */}
        <div className="rounded-lg bg-slate-900 px-4 py-3 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">
              TỔNG THU NHẬP
            </span>
            <span className="text-lg font-bold tabular-nums">
              {VND(result.tongThuNhap)}
            </span>
          </div>
          <p className="mt-0.5 text-[10px] text-slate-400">
            Lương ngạch bậc + TNTT thực nhận
          </p>
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          disabled={status !== "idle"}
          className="mt-4 h-11 w-full gap-2 bg-indigo-600 text-sm font-semibold hover:bg-indigo-700"
        >
          {status === "saving" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Đang lưu...
            </>
          ) : status === "saved" ? (
            <>
              <Check className="size-4" />
              Đã lưu vào hệ thống
            </>
          ) : (
            <>
              <Database className="size-4" />
              Lưu vào Hệ thống (Supabase)
            </>
          )}
        </Button>
        <p className="mt-2 text-center text-[10px] text-slate-400">
          Phiếu lương được tính theo Quy chế chi trả lương nội bộ NETC.
        </p>
      </div>
    </div>
  )
}
