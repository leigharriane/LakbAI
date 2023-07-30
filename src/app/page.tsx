'use client'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Calendar from '@/components/Calendar'
import { store } from '@/store'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      {/* <div className="bg-dark">
      <Nav />
      <div className='mt-[100px] px-[80px]  font-sf'>
        <Calendar />
      </div>

    </div> */}
      <Calendar />
    </Provider>

  )
}

