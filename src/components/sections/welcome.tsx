import React from 'react';

interface Props {
  paid: boolean;
}

const Welcome: React.FC<Props> = ({
  paid
}) => {
  return (
    <div className="h-full w-full flex-shrink-0 snap-start flex flex-col items-start justify-center p-7 ">
      <p className={`text-xl mb-0 ${paid ? 'font-semibold' : ''}`}>I am</p>
      <h1 className={`text-6xl font-extrabold mb-4 ml-10 leading-tight ${paid ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 drop-shadow ml-10' : ''}`}>Phantom</h1>
      <div className={`text-xl ${paid ? 'text-[var(--text-color)]' : 'text-gray-600'} `}>
        <div>I turn <span className='text-2xl text-[var(--text-color-2)]'>Imaginations</span> into things <span className='italic font-semibold'>you use every day</span>.</div>
        <div className='italic font-bold ml-10'>I don't just write code;</div>
        <div className='ml-20'>I make <span className='text-2xl text-[var(--text-color-2)]'>pixleated reality</span> out of it.</div>
      </div>
      <div className='h-full w-full flex justify-center items-end'>
        <p className='text-[var(--text-color)]/50 text-center font-semibold text-2xl abslout b-0 pointer-events-none ' >Don't Scroll Down</p>
      </div>
    </div>
  );
};

export default Welcome;