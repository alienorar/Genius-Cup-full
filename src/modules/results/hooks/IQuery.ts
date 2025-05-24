export interface IGetResultPayload {
  olympiadId: string
  classNumber?: string | null
  language?: string | null
  page: number
  regionId?: string | null
  resultFrom?: number
  resultTo?: number
  size: number
  phone?: string | null
  districtId?: number | null
}
