
import Link from "next/link"

export default function Component() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-12  md:py-16 px-6 md:px-8 lg:px-12 space-y-12 md:space-y-16">
        <div className="grid gap-8 md:gap-12  grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
          <div className="space-y-6">
            <h2 className="text-lg md:text-xl font-bold">About Us</h2>
            <p className="text-sm md:text-base">
              Discover the perfect electronic companion at Electromart's curated collection. From sleek gadgets to smart appliances, our handpicked range ensures you find the ideal tech solution for every need. Explore now!
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-lg md:text-xl font-bold">Contact Us</h2>
            <p className="text-sm md:text-base">
              Phone: +91 8447348741
              <br />
              Email: info@elctromart.com
              <br />
              Address: 123 Ecommerce St., Shopping City, 12345
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-lg md:text-xl font-bold">Customer Service</h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li>
                <Link className="text-white hover:text-gray-300" href="#">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="text-white hover:text-gray-300" href="#">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link className="text-white hover:text-gray-300" href="#">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h2 className="text-lg md:text-xl font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              <Link href="#">
                <FacebookIcon className="w-10 h-10 text-white bg-gray-400 p-2 rounded-full  hover:bg-white hover:text-black duration-200 ease-linear"/>
              </Link>
              <Link href="#">
                <InstagramIcon className="w-10 h-10 p-2 text-white bg-gray-400 rounded-full hover:bg-white hover:text-black duration-200 ease-linear " />
              </Link>
              <Link href="#">
                <TwitterIcon className="w-10 h-10 text-white bg-gray-400 p-2 rounded-full hover:text-black duration-200 ease-linear hover:bg-white" />
              </Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
