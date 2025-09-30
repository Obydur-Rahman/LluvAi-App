import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center my-24 p-6 md:px-28 ">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn Your imagination into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rouded-lg "
        />

        <div>
          <h2 className='text-3xl font-medium max-w-lg mb-4 '>Introducing the AI-Powered Text to Image Generator</h2>
          <p className='text-gray-600 mb-4'>
            Effortlessly turn your ideas into reality with our free AI image
            generator. From breathtaking visuals to one-of-a-kind designs, our
            tool transforms your words into striking images in just a few
            clicks. Picture it, describe it, and see it come alive instantly.
          </p>

          <p className='text-gray-600'>
            Just enter a text prompt, and our advanced AI instantly creates
            high-quality images. From product shots to character designs and
            portraits, even ideas that don’t yet exist can be brought to life
            with ease. With powerful AI technology, your creative possibilities
            are endless.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description