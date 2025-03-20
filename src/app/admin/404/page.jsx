import React from 'react';
import '../../../app/globals.css';
import Link from 'next/link';
const Page = () => {
  return (
    <>
        <div className='conatiner-fluid'>
            <div className='container-fluid relative '>
                <img src="/images/design.png" alt="background image"  className='w-full object-cover max-h-screen'/>
                <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
                <div className='p-6 bg-purple-100 rounded-xl w-[600px]'>
                    <div className='p-2 flex flex-col justify-center items-center '>
                        <h1 className='text-[110px] font-bold text-purple-400 font-mono'>404!</h1>
                        <p className='text-2xl font-serif'>Page Not Found</p>
                        <button className='bg-gray-500 p-3 text-white font-serif rounded-full w-[200px] mt-3'>
                            <Link href="/">
                                Back to Home
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
        
    </>
  )
}

export default Page