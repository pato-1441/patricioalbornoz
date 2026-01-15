import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <section className="flex flex-col items-center justify-center h-full w-full bg-linear-to-b from-[#a6fff2] to-[#ffe6a6]">
        <img
          src={'https://pbs.twimg.com/profile_images/2010743613538353152/sPZTaIV1_400x400.jpg'}
          className="h-[20vmin] rounded-full hover:scale-150 transition-all duration-200 animate-[spin_30s_linear_infinite]"
          alt="logo"
        />
      </section>
    </main>
  )
}
