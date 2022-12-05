import React from 'react'

const combineComponents = (...components): void => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: { children: React.ReactNode }): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }: { children: React.ReactNode }) => <>{children}</>
  )
}

export default combineComponents
