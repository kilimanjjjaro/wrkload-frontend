export interface ChildrenInterface {
  children: React.ReactNode
}

export interface StatsInterface {
  type: string
  value: string
  avg?: string
}

export interface ButtonInterface {
  className?: string
  type?: 'submit'
  variant: 'primary' | 'secondary' | 'light-alternative' | 'dark-alternative'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  fullWidth?: Boolean
  children: React.ReactNode
  disablePagination?: boolean
  isLoading?: boolean
}

export interface InputInterface {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string | number
  name: string
  type: string
  placeholder: string
  autoComplete?: string
  centerText?: boolean
  required?: boolean
  disabled?: boolean
}

export interface TextareaInterface {
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  name: string
  placeholder: string
  centerText?: boolean
  className?: string
}

export interface PaginationInterface {
  totalResults: number
  resultsPerPage: number
  prevPage: number
  page: number
  nextPage: number
}
