import React from 'react';        

export default function DarkPortfolio() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* First Section */}
      <div className="flex items-center justify-between px-16 py-16 min-h-screen">
        {/* Left Content */}
        <div className="w-1/2 pr-16">
          <h1 className="text-4xl font-light mb-8 tracking-wider">
            I HAVE SOME IDEAS
          </h1>
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
            </p>
            <p>
              Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.
            </p>
            <p>
              Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
            </p>
          </div>
          {/* Small icon/logo */}
          <div className="mt-8">
            <div className="w-8 h-6 border border-gray-600 flex items-center justify-center">
              <div className="w-3 h-1 bg-gray-600"></div>
            </div>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="w-1/2 flex justify-end">
          <div className="border border-gray-600 p-2">
            <div className="bg-gray-800 w-80 h-96 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-16 h-16 border-2 border-gray-600 rounded-full mx-auto mb-4"></div>
                <p className="text-sm">Portrait Image</p>
                <p className="text-xs">Man with scarf</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="px-16 py-16">
        <div className="flex items-center justify-between">
          {/* Left side - Large CREATIVE text */}
          <div className="w-1/2">
            <h2 className="text-8xl font-light tracking-widest text-gray-200">
              CREATIVE
            </h2>
          </div>
          
          {/* Right side - Small text */}
          <div className="w-1/2 pl-16">
            <div className="text-xs text-gray-400 space-y-2">
              <p>Version of Lorem Ipsum. Proin gravida</p>
              <p>nibh vel velit auctor aliquet. Aenean</p>
              <p>sollicitudin lorem quis bibendum</p>
              <p className="mt-4 font-medium">THEMEUNIX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex items-center justify-between px-16 py-16 min-h-screen">
        {/* Left Image */}
        <div className="w-1/2 flex justify-start">
          <div className="border border-gray-600 p-2">
            <div className="bg-gray-800 w-80 h-96 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-16 h-16 border-2 border-gray-600 rounded-full mx-auto mb-4"></div>
                <p className="text-sm">Portrait Image</p>
                <p className="text-xs">Man with beard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-1/2 pl-16">
          <h3 className="text-4xl font-light mb-8 tracking-wider">
            I HAVE SOME IDEAS
          </h3>
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
            </p>
            <p>
              Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio.
            </p>
            <p>
              Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
            </p>
            <p>
              This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor.
            </p>
          </div>
          {/* Small icon/logo */}
          <div className="mt-8">
            <div className="w-8 h-6 border border-gray-600 flex items-center justify-center">
              <div className="w-3 h-1 bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

