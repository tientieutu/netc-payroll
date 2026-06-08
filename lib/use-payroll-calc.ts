import { useMemo } from "react"

export type PayrollState = {
  // Section 1
  quyBSTN: number
  kcs: number
  giaTri1DiemCS: number
  ngayChuan: number
  ngayThucTe: number
  // Section 2
  mucLuongCoSo: number
  heSoBacLuong: number
  phuCapChucVu: number
  phuCapTrachNhiem: number
  // Section 3
  kvtCv: number
  kvtCdList: number[] // selected Kvtcd coefficients
  // Section 4
  kkn1List: number[]
  kkn2List: number[]
  // Section 5
  kpi: number
  khq: number
}

export type PayrollResult = {
  // Lương ngạch bậc
  luongNgachBac: number
  // Section 3
  sumKvtCd: number
  kvt: number
  // Section 4
  sumKkn1: number
  sumKkn2Raw: number
  sumKkn2: number // after Khq < 1 rule
  kkn2Voided: boolean
  // Section 5 / TNTT
  cs: number // CS = giá trị 1 điểm * Kcs (value per point applied)
  tnttFull: number
  attendanceRatio: number
  tnttActual: number
  // Grand total
  tongThuNhap: number
}

export function usePayrollCalc(s: PayrollState): PayrollResult {
  return useMemo(() => {
    // Lương ngạch bậc nhà nước
    const luongNgachBac =
      s.mucLuongCoSo * (s.heSoBacLuong + s.phuCapChucVu) + s.phuCapTrachNhiem

    // Section 3: Kvt = Kvtcv + 0.2 * ΣKvtcd
    const sumKvtCd = s.kvtCdList.reduce((a, b) => a + b, 0)
    const kvt = s.kvtCv + 0.2 * sumKvtCd

    // Section 4
    const sumKkn1 = s.kkn1List.reduce((a, b) => a + b, 0)
    const sumKkn2Raw = s.kkn2List.reduce((a, b) => a + b, 0)

    // Rule: if Khq < 1.0 -> Kkn2 voided to 0
    const kkn2Voided = s.khq < 1.0
    const sumKkn2 = kkn2Voided ? 0 : sumKkn2Raw

    // CS value per point applied (giá trị 1 điểm CS * Kcs)
    const cs = s.giaTri1DiemCS * s.kcs

    // TNTT = CS * [ (Kvt + ΣKkn1) * Khq + ΣKkn2 ]
    const tnttFull = cs * ((kvt + sumKkn1) * s.khq + sumKkn2)

    // Attendance adjustment
    const attendanceRatio =
      s.ngayChuan > 0 ? Math.min(s.ngayThucTe / s.ngayChuan, 1) : 0
    const tnttActual = tnttFull * attendanceRatio

    const tongThuNhap = luongNgachBac + tnttActual

    return {
      luongNgachBac,
      sumKvtCd,
      kvt,
      sumKkn1,
      sumKkn2Raw,
      sumKkn2,
      kkn2Voided,
      cs,
      tnttFull,
      attendanceRatio,
      tnttActual,
      tongThuNhap,
    }
  }, [s])
}
