import { createFileRoute } from '@tanstack/react-router'
import { Github, Linkedin } from 'lucide-react'
import { X } from '@/components/icons/x'


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-amber-950 bg-amber-50">
      <section className="h-2/3 w-4/5 grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-4 items-start">
          <a href="https://twitter.com/patoalbornozz" target="_blank" rel="noopener noreferrer" className='group'>
            <img
              src={'https://pbs.twimg.com/profile_images/2010743613538353152/sPZTaIV1_400x400.jpg'}
              className="h-52 rounded-xl group-hover:opacity-90 transition-all duration-200"
              alt="patricio albornoz picture"
            />
          </a>
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center gap-0">
              <h1 className="text-4xl font-bold">Patricio Albornoz</h1>
              <p className="text-xl">Doer</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <a href="https://x.com/patoalbornozz" target="_blank" rel="noopener noreferrer" className='group flex items-center justify-center gap-1.5'>
                <X />
                <span className="text-base">Twitter</span>
              </a>
              <a href="https://github.com/pato-1441" target="_blank" rel="noopener noreferrer" className='group flex items-center justify-center gap-1.5'>
                <Github className="size-4" />
                <span className="text-base">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/patoalbornoz/" target="_blank" rel="noopener noreferrer" className='group flex items-center justify-center gap-1.5'>
                <Linkedin className="size-4" />
                <span className="text-base">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-start">
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quaerat assumenda mollitia obcaecati ullam fugiat, veniam iusto nesciunt tempora quae pariatur earum sint in perspiciatis odio maxime consectetur asperiores possimus voluptates molestiae quia, repellendus quam! Obcaecati modi dicta a velit ratione error eos iure eligendi accusantium. Ipsa dolorem quo quisquam.
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quaerat assumenda mollitia obcaecati ullam fugiat, veniam iusto nesciunt tempora quae pariatur earum sint in perspiciatis odio maxime consectetur asperiores possimus voluptates molestiae quia, repellendus quam! Obcaecati modi dicta a velit ratione error eos iure eligendi accusantium. Ipsa dolorem quo quisquam.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-start">
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quaerat assumenda mollitia obcaecati ullam fugiat, veniam iusto nesciunt tempora quae pariatur earum sint in perspiciatis odio maxime consectetur asperiores possimus voluptates molestiae quia, repellendus quam! Obcaecati modi dicta a velit ratione error eos iure eligendi accusantium. Ipsa dolorem quo quisquam.
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quaerat assumenda mollitia obcaecati ullam fugiat, veniam iusto nesciunt tempora quae pariatur earum sint in perspiciatis odio maxime consectetur asperiores possimus voluptates molestiae quia, repellendus quam! Obcaecati modi dicta a velit ratione error eos iure eligendi accusantium. Ipsa dolorem quo quisquam.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-start">
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quaerat assumenda mollitia obcaecati ullam fugiat, veniam iusto nesciunt tempora quae pariatur earum sint in perspiciatis odio maxime consectetur asperiores possimus voluptates molestiae quia, repellendus quam! Obcaecati modi dicta a velit ratione error eos iure eligendi accusantium. Ipsa dolorem quo quisquam.
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quaerat assumenda mollitia obcaecati ullam fugiat, veniam iusto nesciunt tempora quae pariatur earum sint in perspiciatis odio maxime consectetur asperiores possimus voluptates molestiae quia, repellendus quam! Obcaecati modi dicta a velit ratione error eos iure eligendi accusantium. Ipsa dolorem quo quisquam.
          </p>
        </div>
      </section>
    </main>
  )
}
