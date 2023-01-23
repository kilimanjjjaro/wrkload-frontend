export interface ChildrenInterface {
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

export interface ButtonInterface {
  type?: 'submit'
  variant: 'primary' | 'secondary' | 'alternative'
  onClick?: (() => void) | ((event: any) => void)
  fullWidth?: Boolean
  children: React.ReactNode
}

export interface InputInterface {
  variant: 'primary' | 'alternative' | 'disabled'
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
  variant: 'primary' | 'alternative'
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  name: string
  placeholder: string
  centerText?: boolean
}
