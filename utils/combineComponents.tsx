const combineComponents = (...components: any[]): { children: React.ReactNode } => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      // eslint-disable-next-line react/display-name
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
