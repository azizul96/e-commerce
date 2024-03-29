import Link from "next/link";
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io";


const Footer = () => {
  return (
    <footer className="bg-white mt-10">
      <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              <div className="sm:col-span-2">
                  <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">Subscribe</h1>

                  <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                      <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address"/>
              
                      <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-[#c70039] rounded-lg hover:bg-red-800 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                          Subscribe
                      </button>
                  </div>
              </div>

              <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Quick Link</p>

                  <div className="flex flex-col items-start mt-5 space-y-2">
                      <Link href="#" className="text-gray-600 transition-colors duration-300  hover:underline hover:text-[#c70039]">Home</Link>
                      <Link href="#" className="text-gray-600 transition-colors duration-300  hover:underline hover:text-[#c70039]">About</Link>
                      <Link href="#" className="text-gray-600 transition-colors duration-300  hover:underline hover:text-[#c70039]">Our Story</Link>
                      
                  </div>
              </div>

              <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Industries</p>

                  <div className="flex flex-col items-start mt-5 space-y-2">
                      <Link href="#" className="text-gray-600 transition-colors duration-300  hover:underline hover:text-[#c70039]">Retail & E-Commerce</Link>
                      <Link href="#" className="text-gray-600 transition-colors duration-300  hover:underline hover:text-[#c70039]">Information Technology</Link>
                      <Link href="#" className="text-gray-600 transition-colors duration-300  hover:underline hover:text-[#c70039]">Finance & Insurance</Link>
                  </div>
              </div>
          </div>
          
          <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700"/>
          
          <div className="flex items-center justify-between">
              <Link href="/">
                <span className="self-center text-2xl font-bold whitespace-nowrap"><span className="text-[#C70039]">E-</span>Shop</span>
              </Link>
              
              <div className="flex -mx-2">
                  <a href="#" className="mx-2 transition-colors duration-300 dark:text-gray-300 text-lg text-blue-500" aria-label="Facebook">
                      <ImFacebook2/>
                  </a>

                  <a href="#" className="mx-2 transition-colors duration-300 dark:text-gray-300 text-lg text-rose-500" aria-label="Facebook">
                      <GrInstagram/>
                  </a>

                  <a href="#" className="mx-2  transition-colors duration-300 dark:text-gray-300 text-lg text-red-600" aria-label="YouTube">
                      <IoLogoYoutube/>
                  </a>
              </div>
          </div>
      </div>
  </footer>
  );
};

export default Footer;