import { PlusIcon } from '@heroicons/react/24/outline'

import HeroHeader from './components/HeroHeader'
import Feature from './components/Feature'
import Testimony from './components/Testimony'
import Headline from './components/shared/Headline'
import Button from './components/shared/Button'

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
      <header>
        <HeroHeader />
      </header>

      <main>
        <section className='container flex flex-col gap-y-28 mx-auto pt-28 dark:text-white text-center'>
          {features.map((feature, index) => (
            <Feature key={index} image={feature.image} title={feature.title} description={feature.description} />
          ))}
        </section>

        <section className='container flex flex-col items-center  mx-auto pt-28 dark:text-white text-center'>
          <Headline type='h3'>What they say</Headline>
          <div className='columns-2 md:columns-3 lg:columns-4 gap-10 mb-10'>
            {testimonies.map((testimony, index) => (
              <Testimony key={index} image={testimony.image} name={testimony.name} rol={testimony.rol} text={testimony.text} />
            ))}
          </div>
          <Button type='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
        </section>
      </main>
    </>
  )
}
