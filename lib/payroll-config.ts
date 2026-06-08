// NETC Payroll regulation constants & coefficients

export type Option<T extends number = number> = {
  value: T
  label: string
}

// Section 1 - Hệ số Kcs (chất lượng/scaling factor for điểm CS)
export const KCS_OPTIONS: Option[] = [
  { value: 1.1, label: "1.00 - 1.20 (Hoàn thành xuất sắc)" },
  { value: 0.8, label: "0.70 - 0.90 (Hoàn thành tốt)" },
  { value: 0.45, label: "0.30 - 0.60 (Hoàn thành)" },
  { value: 0, label: "0 (Không hoàn thành)" },
]

// Section 2 - Phụ cấp chức vụ (nhà nước)
export const PHU_CAP_CHUC_VU_OPTIONS: Option[] = [
  { value: 0, label: "Không có" },
  { value: 0.6, label: "Giám đốc (0.6)" },
  { value: 0.4, label: "Phó Giám đốc (0.4)" },
  { value: 0.3, label: "KTT / Trưởng phòng (0.3)" },
  { value: 0.2, label: "Phó Trưởng phòng (0.2)" },
]

// Section 3 - Hệ số chức vụ Kvtcv
export const KVT_CV_OPTIONS: Option[] = [
  { value: 0, label: "Không giữ chức vụ (0)" },
  { value: 8.5, label: "Giám đốc (8.5)" },
  { value: 6.5, label: "Phó Giám đốc (6.5)" },
  { value: 5.0, label: "Trưởng phòng (5.0)" },
  { value: 4.5, label: "Phó Trưởng phòng (4.5)" },
]

// Section 3 - Hệ số chuyên môn Kvtcd
export const KVT_CD_OPTIONS: Option[] = [
  { value: 0, label: "Không áp dụng (0)" },
  { value: 4.3, label: "ĐKV bậc 3 (4.3)" },
  { value: 4.0, label: "ĐKV bậc 2 (4.0)" },
  { value: 3.7, label: "ĐKV bậc 1 (3.7)" },
  { value: 3.4, label: "Chuyên viên chính (3.4)" },
  { value: 3.0, label: "Chuyên viên (3.0)" },
  { value: 2.5, label: "Cán sự (2.5)" },
]

// Section 4 - Kiêm nhiệm Loại 1 (project lead) - max 2 items
export const KKN1_OPTIONS: Option[] = [
  { value: 0.3, label: "Tổ trưởng DA < 1 tỷ (+0.3)" },
  { value: 1.5, label: "Tổ trưởng DA 1 - 5 tỷ (+1.5)" },
  { value: 2.5, label: "Tổ trưởng DA > 5 tỷ (+2.5)" },
]
export const KKN1_MAX_ITEMS = 2

// Section 4 - Kiêm nhiệm Loại 2 (committees) - max total 0.4
export const KKN2_OPTIONS: Option[] = [
  { value: 0.25, label: "Tổ ISO (+0.25)" },
  { value: 0.2, label: "Công đoàn (+0.20)" },
  { value: 0.2, label: "PCCC (+0.20)" },
  { value: 0.15, label: "Đoàn Thanh niên (+0.15)" },
  { value: 0.1, label: "An toàn vệ sinh viên (+0.10)" },
]
export const KKN2_MAX_TOTAL = 0.4

// Section 5 - Hệ số Khq quy đổi
export const KHQ_OPTIONS: Option[] = [
  { value: 1.2, label: "A+ (1.20)" },
  { value: 1.0, label: "A (1.00)" },
  { value: 0.8, label: "B (0.80)" },
  { value: 0.5, label: "C (0.50)" },
  { value: 0, label: "D (0)" },
]

export const DEFAULTS = {
  quyBSTN: 500_000_000,
  kcs: 1.1,
  giaTri1DiemCS: 50_000,
  ngayChuan: 22,
  ngayThucTe: 22,
  mucLuongCoSo: 2_340_000,
  heSoBacLuong: 3.0,
  phuCapChucVu: 0,
  phuCapTrachNhiem: 0,
  kvtCv: 0,
  khq: 1.0,
  kpi: 100,
}

export const VND = (n: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0)

export const NUM = (n: number, frac = 2) =>
  new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: frac,
  }).format(Number.isFinite(n) ? n : 0)
