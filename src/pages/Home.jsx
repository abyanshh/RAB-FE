import React from 'react'
import heroImage from '/image/heroimage.svg'
import Button from '../components/Button'
import MainLayout from '../Layout/MainLayout'
import heroImage2 from '/image/2222.png'

const Home = () => {
  return (
    <MainLayout>
    <section className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Welcome to <span className="text-cyan-600">Ruang Aman Bersama</span>
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
          Your modern solution for decision-making, scheduling, and community support around mental disorder.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button to='/login' as='link' variant='orange'>Get Started !</Button>
          </div>
        </div>

        {/* Image  */}
        <div className="flex-1">
          <img
            src={heroImage2}
            alt="Hero Illustration"
            className="w-sm md:w-full rounded-md"
          />
        </div>
      </div>
    </section>
    </MainLayout>
  )
}

export default Home