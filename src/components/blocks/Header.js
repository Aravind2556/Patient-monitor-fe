'use client'

import { useContext, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { IoLogOut } from "react-icons/io5";
import { DContext } from '../../context/Datacontext'
import { renderImgUrl } from '../../utils/renderImgUrl'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]

const accountOptions = [

  { name: 'Logout', description: '', href: '/logout', icon: IoLogOut },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuth, handleLogout, currentUser } = useContext(DContext)
  console.log("CurrenTuser:", currentUser)
  return (
    <header className="bg-slate-100 shadow-md">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <span className='font-black text-sm text-primary-700'>Varicose Monitoring</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            isAuth &&
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                <img className='h-11 aspect-square rounded-full' src={renderImgUrl("", "", currentUser.fullname)} alt="profile" />
                {currentUser.fullname
                }
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {accountOptions.map((item) => (
                    <div
                      key={item.name}
                      className={`group relative flex items-center gap-x-6 rounded-lg py-1 px-2 text-sm/6 hover:bg-gray-50 ${item.href === "/logout" ? "text-red-500" : "text-gray-900"}`}
                    >
                      <div className="flex flex-none p-1 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon aria-hidden="true" className="size-6 group-hover:text-indigo-600" />
                      </div>
                      <div className="flex-auto">
                        <p className="block font-semibold " onClick={handleLogout}>
                          {item.name}
                          <span className="absolute inset-0" />
                        </p>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          }
          {
            !isAuth &&
            <div className='flex gap-4'><button

              className="w-[100px] h-[38px] text-sm md:text-[16px] text-[#2c25c4] border border-[#2C25C4] rounded-md bg-white"
              onClick={() => window.location.href = "/signin"}
            >
              Login
            </button>

              <button

                className="w-[100px] h-[38px] text-white text-sm md:text-[16px] bg-primary-700 rounded-md"
                onClick={() => window.location.href = "/signin"}
              >
                Register
              </button>
            </div>
          }
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">

              <div className="py-6">
                {
                  isAuth &&
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      <img className='h-11 aspect-square rounded-full' src={renderImgUrl("", "", currentUser.fullname)} alt="profile" />
                      {currentUser.fullname}
                      <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {accountOptions.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          onClick={handleLogout}
                          className={`block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold hover:bg-gray-50 ${item.href === "/logout" ? "text-red-500" : "text-gray-900"}`}
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>

                }
                {
                  !isAuth &&
                  <div className='flex gap-5 justify-center'>
                    <button

                      className="w-[200px] h-[38px] text-sm md:text-[16px] text-[#2c25c4] border border-[#2C25C4] rounded-md bg-white"
                      onClick={() => window.location.href = "/"}
                    >
                      Login
                    </button>

                  </div>
                }
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
