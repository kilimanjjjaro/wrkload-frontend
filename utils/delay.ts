export default async function delay (): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 10000))
}
