import { PlusIcon } from '@heroicons/react/24/outline'

import HeroHeader from './components/HeroHeader'
import Headline from './components/shared/Headline'
import Button from './components/shared/Button'
import Feature from './components/Feature'
import Testimony from './components/Testimony'
import Form from './components/Form'

import featureImage from '../public/images/feature.jpg'
import testimonyImage from '../public/images/testimony.jpg'

const features = [
  { image: featureImage, title: 'Without chaos at payday!', description: 'wrkload was developed to help people who get paid by goals to keep track of -easily and clearly- what they have worked on in the month.' },
  { image: featureImage, title: 'All you need in one blink!', description: 'You can control in detail the time you worked on a task and extra data associated with it. All in the same place.' },
  { image: featureImage, title: 'Mo control Mo safety!', description: 'You can have real-time access to what you are earning per project at month and check what you earned at last months.' },
  { image: featureImage, title: 'Fast and safe!', description: 'Just upload your tasks and go have fun because only you have access to them.' }
]

const testimonies = [
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Quisque fringilla turpis at convallis pulvinar adipiscing.' },
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula adipiscing elit.' },
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Lorem ipsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit. Vestibulum gravida lorem id. Loremsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit gravida.' },
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem.' },
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Quisque fringilla turpis at convallis pulvinar adipiscing.' },
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula adipiscing elit.' },
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem.' },
  { image: testimonyImage, name: 'Shannon Wise', rol: 'CEO at Wherever', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida lorem id fermentum vehicula. Lorem ipsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit. Vestibulum gravida lorem id. Loremsum dolor sit amet, consur adipiscing elit. Vestibulum cing elit gravida.' }
]

export default function Home () {
  return (
    <>
      <header className='container px-6 mx-auto md:px-8'>
        <HeroHeader />
      </header>
      <main className='container px-6 py-24 mx-auto md:px-8 md:py-28'>
        <section className='grid mx-auto text-center gap-y-16 md:gap-y-24 dark:text-white'>
          {features.map((feature, index) => (
            <Feature key={index} image={feature.image} title={feature.title} description={feature.description} />
          ))}
        </section>
        <section className='pt-24 text-center md:pt-36 dark:text-white'>
          <Headline type='h3'>What they say</Headline>
          <div className='gap-10 xl:mb-10 columns-1 md:columns-2 xl:columns-4'>
            {testimonies.map((testimony, index) => (
              <Testimony key={index} image={testimony.image} name={testimony.name} rol={testimony.rol} text={testimony.text} index={index} />
            ))}
          </div>
          <Button type='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
        </section>
        <section className='grid pt-24 text-center xl:gap-10 xl:grid-cols-2 md:pt-36 dark:text-white xl:text-left'>
          <Headline type='h3'>Let's talk!</Headline>
          <Form />
        </section>
      </main>
    </>
  )
}
