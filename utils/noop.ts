export const noop = (): void => undefined

export const subscribeToNothing = (): (() => void) => noop
