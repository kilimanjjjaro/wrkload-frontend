import Footer from 'app/components/shared/Footer'
import { PlusIcon } from '@heroicons/react/24/outline'
import HeroHeader from 'app/components/HeroHeader'
import Headline from 'app/components/shared/Headline'
import Button from 'app/components/shared/Button'
import Feature from 'app/components/Feature'
import Testimony from 'app/components/Testimony'
import Form from 'app/components/Form'
import featureImage from 'public/images/feature.jpg'
import testimonyImage from 'public/images/testimony.jpg'
import FeaturesInterface from 'interfaces/home/Features'
import TestimoniesInterface from 'interfaces/home/Testimonies'

const FEATURES: FeaturesInterface[] = [
  {
    image: featureImage,
    title: 'Without chaos at payday!',
    description:
      'wrkload was developed to help people who get paid by goals to keep track of -easily and clearly- what they have worked on in the month.'
  },
  {
    image: featureImage,
    title: 'All you need in one blink!',
    description:
      'You can control in detail the time you worked on a task and extra data associated with it. All in the same place.'
  },
  {
    image: featureImage,
    title: 'Mo control Mo safety!',
    description:
      'You can have real-time access to what you are earning per project at month and check what you earned at last months.'
  },
  {
    image: featureImage,
    title: 'Fast and safe!',
    description:
      'Just upload your tasks and go have fun because only you have access to them.'
  }
]

const TESTIMONIES: TestimoniesInterface[] = [
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Quisque fringilla turpis at convallis pulvinar adipiscing.'
  },
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula adipiscing elit.'
  },
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Lorem ipsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit. Vestibulum gravida lorem id. Loremsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit gravida.'
  },
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem.'
  },
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Quisque fringilla turpis at convallis pulvinar adipiscing.'
  },
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula adipiscing elit.'
  },
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem.'
  },
  {
    image: testimonyImage,
    name: 'Shannon Wise',
    rol: 'CEO at Wherever',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Lorem ipsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit. Vestibulum gravida lorem id. Loremsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit gravida.'
  }
]

export default function Home (): JSX.Element {
  return (
    <div className='bg-gray-200 dark:bg-alternative'>
      <div className='bg-white dark:bg-black rounded-b-3xl'>
        <header className='container px-6 mx-auto md:px-8'>
          <HeroHeader />
        </header>
        <main className='container px-6 mx-auto md:px-8'>
          <section className='grid mx-auto text-center gap-y-16 md:gap-y-24 dark:text-white'>
            {FEATURES.map((feature, index) => (
              <Feature
                key={index}
                image={feature.image}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </section>
          <section className='pt-24 text-center md:pt-36 dark:text-white'>
            <Headline variant='xl'>What they say</Headline>
            <div className='gap-10 columns-1 md:columns-2 xl:columns-4'>
              {TESTIMONIES.map((testimony, index) => (
                <Testimony
                  key={index}
                  image={testimony.image}
                  name={testimony.name}
                  rol={testimony.rol}
                  text={testimony.text}
                />
              ))}
            </div>
            <Button variant='primary'>
              <PlusIcon className='w-4 stroke-width-3' />
            </Button>
          </section>
          <section className='grid pt-24 text-center xl:gap-10 xl:grid-cols-2 md:pt-36 dark:text-white xl:text-left'>
            <Headline variant='xl'>Let's talk!</Headline>
            <Form />
          </section>
        </main>
      </div>
      <Footer variant='primary' />
    </div>
  )
}
