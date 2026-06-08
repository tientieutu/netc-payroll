"use client"

import { useState } from "react"
import {
  Building2,
  Landmark,
  Briefcase,
  Users,
  Target,
  Info,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { NumberField, SelectField } from "@/components/payroll/form-fields"
import { CoefficientPicker } from "@/components/payroll/coefficient-picker"
import { PayrollReceipt } from "@/components/payroll/payroll-receipt"
import { usePayrollCalc, type PayrollState } from "@/lib/use-payroll-calc"
import {
  DEFAULTS,
  KCS_OPTIONS,
  PHU_CAP_CHUC_VU_OPTIONS,
  KVT_CV_OPTIONS,
  KVT_CD_OPTIONS,
  KKN1_OPTIONS,
  KKN1_MAX_ITEMS,
  KKN2_OPTIONS,
  KKN2_MAX_TOTAL,
  KHQ_OPTIONS,
  VND,
} from "@/lib/payroll-config"

function SectionCard({
  index,
  title,
  icon: Icon,
  children,
}: {
  index: number
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="flex items-center gap-3 text-sm font-semibold text-slate-800">
          <span className="flex size-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
            {index}
          </span>
          <Icon className="size-4 text-indigo-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  )
}

export function PayrollCalculator() {
  const [state, setState] = useState<PayrollState>({
    quyBSTN: DEFAULTS.quyBSTN,
    kcs: DEFAULTS.kcs,
    giaTri1DiemCS: DEFAULTS.giaTri1DiemCS,
    ngayChuan: DEFAULTS.ngayChuan,
    ngayThucTe: DEFAULTS.ngayThucTe,
    mucLuongCoSo: DEFAULTS.mucLuongCoSo,
    heSoBacLuong: DEFAULTS.heSoBacLuong,
    phuCapChucVu: DEFAULTS.phuCapChucVu,
    phuCapTrachNhiem: DEFAULTS.phuCapTrachNhiem,
    kvtCv: DEFAULTS.kvtCv,
    kvtCdList: [],
    kkn1List: [],
    kkn2List: [],
    kpi: DEFAULTS.kpi,
    khq: DEFAULTS.khq,
  })

  const set = <K extends keyof PayrollState>(key: K, value: PayrollState[K]) =>
    setState((p) => ({ ...p, [key]: value }))

  const result = usePayrollCalc(state)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-slate-900">
              <Building2 className="size-5 text-indigo-300" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900">
                Hệ thống Tính lương NETC
              </h1>
              <p className="text-xs text-slate-500">
                Bảng tính thu nhập theo Quy chế chi trả lương nội bộ
              </p>
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-[11px] uppercase tracking-wider text-slate-400">
              Tổng thu nhập
            </p>
            <p className="text-lg font-bold tabular-nums text-indigo-600">
              {VND(result.tongThuNhap)}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left column 70% */}
          <div className="flex w-full flex-col gap-5 lg:w-[70%]">
            {/* Section 1 */}
            <SectionCard
              index={1}
              title="Thông tin chung & Quỹ"
              icon={Building2}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <NumberField
                  label="Quỹ BSTN khả thi"
                  hint="Tổng quỹ bổ sung thu nhập khả dụng"
                  value={state.quyBSTN}
                  onChange={(v) => set("quyBSTN", v)}
                  suffix="VNĐ"
                />
                <SelectField
                  label="Hệ số Kcs"
                  hint="Hệ số chất lượng đơn vị"
                  value={state.kcs}
                  onChange={(v) => set("kcs", v)}
                  options={KCS_OPTIONS}
                />
                <NumberField
                  label="Giá trị 1 điểm CS"
                  hint="VNĐ / điểm chất lượng"
                  value={state.giaTri1DiemCS}
                  onChange={(v) => set("giaTri1DiemCS", v)}
                  suffix="VNĐ"
                />
                <div className="grid grid-cols-2 gap-3">
                  <NumberField
                    label="Ngày làm việc TC"
                    value={state.ngayChuan}
                    onChange={(v) => set("ngayChuan", v)}
                    suffix="ngày"
                  />
                  <NumberField
                    label="Ngày đi làm TT"
                    value={state.ngayThucTe}
                    onChange={(v) => set("ngayThucTe", v)}
                    suffix="ngày"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Section 2 */}
            <SectionCard
              index={2}
              title="Lương Ngạch Bậc Nhà Nước"
              icon={Landmark}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <NumberField
                  label="Mức lương cơ sở"
                  value={state.mucLuongCoSo}
                  onChange={(v) => set("mucLuongCoSo", v)}
                  suffix="VNĐ"
                />
                <NumberField
                  label="Hệ số bậc lương"
                  value={state.heSoBacLuong}
                  onChange={(v) => set("heSoBacLuong", v)}
                  step={0.01}
                />
                <SelectField
                  label="Phụ cấp chức vụ"
                  value={state.phuCapChucVu}
                  onChange={(v) => set("phuCapChucVu", v)}
                  options={PHU_CAP_CHUC_VU_OPTIONS}
                />
                <NumberField
                  label="Phụ cấp trách nhiệm / Khác"
                  hint="Nhập trực tiếp số tiền (VNĐ)"
                  value={state.phuCapTrachNhiem}
                  onChange={(v) => set("phuCapTrachNhiem", v)}
                  suffix="VNĐ"
                />
              </div>
            </SectionCard>

            {/* Section 3 */}
            <SectionCard
              index={3}
              title="Hệ số Vị trí Việc làm — Kvt"
              icon={Briefcase}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  label="Hệ số chức vụ — Kvtcv"
                  value={state.kvtCv}
                  onChange={(v) => set("kvtCv", v)}
                  options={KVT_CV_OPTIONS}
                />
                <CoefficientPicker
                  label="Hệ số chuyên môn — Kvtcd"
                  options={KVT_CD_OPTIONS}
                  values={state.kvtCdList}
                  onChange={(v) => set("kvtCdList", v)}
                />
              </div>
              <Alert className="mt-4 border-indigo-200 bg-indigo-50 text-indigo-800">
                <Info className="size-4 !text-indigo-600" />
                <AlertDescription className="text-indigo-800">
                  Công thức áp dụng:{" "}
                  <span className="font-mono font-semibold">
                    Kvt = Kvtcv + 0.2 × ΣKvtcd
                  </span>{" "}
                  (nếu có chức vụ và kiêm nhiệm chuyên môn).
                </AlertDescription>
              </Alert>
            </SectionCard>

            {/* Section 4 */}
            <SectionCard index={4} title="Hệ số Kiêm nhiệm — Kkn" icon={Users}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <CoefficientPicker
                  label="Kiêm nhiệm Loại 1 — Kkn1"
                  options={KKN1_OPTIONS}
                  values={state.kkn1List}
                  onChange={(v) => set("kkn1List", v)}
                  maxItems={KKN1_MAX_ITEMS}
                />
                <CoefficientPicker
                  label="Kiêm nhiệm Loại 2 — Kkn2"
                  options={KKN2_OPTIONS}
                  values={state.kkn2List}
                  onChange={(v) => set("kkn2List", v)}
                  maxTotal={KKN2_MAX_TOTAL}
                />
              </div>
            </SectionCard>

            {/* Section 5 */}
            <SectionCard index={5} title="Đánh giá KPI — Khq" icon={Target}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <NumberField
                  label="Tổng điểm KPI tháng"
                  hint="Ví dụ: 115"
                  value={state.kpi}
                  onChange={(v) => set("kpi", v)}
                  suffix="điểm"
                />
                <SelectField
                  label="Hệ số Khq quy đổi"
                  value={state.khq}
                  onChange={(v) => set("khq", v)}
                  options={KHQ_OPTIONS}
                />
              </div>
              {state.khq < 1.0 ? (
                <Alert className="mt-4 border-amber-200 bg-amber-50 text-amber-800">
                  <AlertTriangle className="size-4 !text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Lưu ý: Khq &lt; 1.0 (Loại B, C, D) — tổng hệ số{" "}
                    <span className="font-semibold">Kkn2 đã bị hủy về 0</span>.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="mt-4 border-amber-200 bg-amber-50 text-amber-800">
                  <AlertTriangle className="size-4 !text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Lưu ý: Nếu Khq &lt; 1.0 (Loại B, C, D), tổng hệ số Kkn2 sẽ bị
                    hủy về 0.
                  </AlertDescription>
                </Alert>
              )}
            </SectionCard>
          </div>

          {/* Right column 30% sticky */}
          <div className="w-full lg:w-[30%]">
            <div className="lg:sticky lg:top-6">
              <PayrollReceipt state={state} result={result} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
