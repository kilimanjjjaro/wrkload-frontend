import HeroHeader from 'app/components/HeroHeader'
// import featureImage from 'public/images/feature.jpg'
// import FeaturesInterface from 'interfaces/home/Features'

// const FEATURES: FeaturesInterface[] = [
//   {
//     image: featureImage,
//     title: 'Without chaos at payday!',
//     description:
//       'wrkload was developed to help people who get paid by goals to keep track of -easily and clearly- what they have worked on in the month.'
//   },
//   {
//     image: featureImage,
//     title: 'All you need in one blink!',
//     description:
//       'You can control in detail the time you worked on a task and extra data associated with it. All in the same place.'
//   },
//   {
//     image: featureImage,
//     title: 'Mo control Mo safety!',
//     description:
//       'You can have real-time access to what you are earning per project at month and check what you earned at last months.'
//   },
//   {
//     image: featureImage,
//     title: 'Fast and safe!',
//     description:
//       'Just upload your tasks and go have fun because only you have access to them.'
//   }
// ]

export default function Home (): JSX.Element {
  return (
    <main className='px-[5vw]'>
      <HeroHeader />
    </main>
  )
}
