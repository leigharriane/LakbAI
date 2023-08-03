'use client'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Calendar from '@/components/Calendar'
import { store } from '@/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
export default function Home() {

  useEffect(()=>{
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then((data) => {
      console.log(data)
    })
  },[])
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

