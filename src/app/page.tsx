import Image from 'next/image'
import Nav from '@/components/Nav'
import { Calendar } from '@/components/Calendar'

export default function Home() {
  return (
    <div className="bg-dark">
      <Nav />
      <div className='mt-[100px] px-[80px] text-white font-sf'>
        <Calendar />
      </div>

    </div>
  )
}
