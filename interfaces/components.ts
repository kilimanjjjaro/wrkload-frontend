export interface LayoutProps {
  children: React.ReactNode
}

export interface StatsInterface {
  type: string
  value: string
  avg?: string
}

export interface PaginationInterface {
  totalResults: number
  resultsPerPage: number
  prevPage: number
  page: number
  nextPage: number
}
