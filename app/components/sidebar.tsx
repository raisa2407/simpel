'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, FileText, Send, Calendar, HelpCircle, MessageSquare, ChevronDown, ChevronRight, User, Clock, X,
  Info,
  FilePlus,
  ClipboardList,
  Vote,
  Users,
  BookOpen
} from 'lucide-react'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({})
  const [isHovering, setIsHovering] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.category && item.items) {
        item.items.forEach((subItem) => {
          if (subItem.subItems) {
            const hasActiveChild = subItem.subItems.some((sub) => pathname === sub.path)
            if (hasActiveChild) {
              setDropdownOpen(prev => ({ ...prev, [subItem.key]: true }))
            }
          }
        })
      }
    })
  }, [pathname])

  const toggleDropdown = (key: string) => {
    setDropdownOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleMouseEnter = () => {
    if (!sidebarOpen) {
      setIsHovering(true)
      setSidebarOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (isHovering) {
      setIsHovering(false)
      setSidebarOpen(false)
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const hasActiveChild = (subItems: any[]) => {
    return subItems?.some((sub) => pathname === sub.path)
  }

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      key: 'dashboard',
      path: '/dashboard'
    },
    {
      label: 'Pengajuan Permohonan',
      category: true,
      items: [
        {
          icon: FileText,
          label: 'PUU',
          key: 'puu',
          subItems: [
            { icon: Info, label: 'Info Permohonan', path: '/dashboard/pemohon/puu' },
            { icon: FilePlus, label: 'Permohonan PUU', path: '/dashboard/pemohon/puu/buat' }
          ]
        },
        {
          icon: Send,
          label: 'SKLN',
          key: 'skln',
          subItems: [
            { icon: Info, label: 'Info Permohonan', path: '/dashboard/pemohon/skln' },
            { icon: ClipboardList, label: 'Permohonan SKLN', path: '/dashboard/pemohon/skln/buat' }
          ]
        },
        {
          icon: Vote,
          label: 'PILKADA 2024',
          key: 'pilkada',
          subItems: [
            { icon: Users, label: 'Pemohon', path: '/dashboard/pemohon/pilkada' },
            { icon: ClipboardList, label: 'Pihak Terkait', path: '/dashboard/pemohon/pilkada/pihak-terkait' }
          ]
        }
      ]
    },
    {
      label: 'Informasi',
      category: true,
      items: [
        {
          icon: Calendar,
          label: 'Jadwal Sidang',
          key: 'jadwal',
          path: '/dashboard/jadwal'
        },
        {
          icon: HelpCircle,
          label: 'Bantuan',
          key: 'bantuan',
          subItems: [
            { label: 'Panduan', path: '/dashboard/bantuan/panduan', icon: BookOpen },
            { label: 'FAQ', path: '/dashboard/bantuan/faq', icon: HelpCircle },
            { label: 'Contoh Permohonan', path: '/dashboard/bantuan/contoh', icon: FileText }
          ]
        },
        {
          icon: MessageSquare,
          label: 'Konsultasi',
          key: 'konsultasi',
          path: '/dashboard/konsultasi'
        }
      ]
    }
  ]

  const formatDate = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`${sidebarOpen ? 'w-72' : 'w-20'} flex-none bg-gradient-to-b from-red-600 to-red-700 text-white transition-all duration-300 flex flex-col shadow-2xl fixed lg:relative h-full z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4 border-b border-red-500 bg-red-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-12 h-12 shrink-0 object-contain"
              />

              {sidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold">SIMPEL</h1>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button
                onClick={() => {
                  setSidebarOpen(false)
                  setIsHovering(false)
                }}
                className="lg:hidden text-white hover:bg-red-600 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="px-4 py-6 border-b border-red-500">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-red-600" />
              </div>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold text-sm">Raiden Shogun</p>
                <p className="text-xs text-red-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                  Online
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-700">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.category ? (
                <div className="mb-4">
                  {sidebarOpen && (
                    <p className="px-4 py-2 text-xs font-semibold text-red-200 uppercase tracking-wider">
                      {item.label}
                    </p>
                  )}
                  {item.items.map((subItem, subIndex) => (
                    <div key={subIndex}>
                      {subItem.path && !subItem.subItems ? (
                        <Link
                          href={subItem.path}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${isActive(subItem.path)
                            ? 'bg-red-800 text-white shadow-lg'
                            : 'hover:bg-red-600'
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <subItem.icon className={`w-5 h-5 flex-shrink-0 ${isActive(subItem.path) ? 'text-yellow-300' : ''}`} />
                            {sidebarOpen && <span className="text-sm font-medium">{subItem.label}</span>}
                          </div>
                          {isActive(subItem.path) && (
                            <div className="w-1 h-8 bg-yellow-400 rounded-full absolute right-2"></div>
                          )}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => subItem.subItems && toggleDropdown(subItem.key)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${hasActiveChild(subItem.subItems)
                              ? 'bg-red-800 text-white'
                              : 'hover:bg-red-600'
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <subItem.icon className={`w-5 h-5 flex-shrink-0 ${hasActiveChild(subItem.subItems) ? 'text-yellow-300' : ''}`} />
                              {sidebarOpen && <span className="text-sm font-medium">{subItem.label}</span>}
                            </div>
                            {sidebarOpen && subItem.subItems && (
                              dropdownOpen[subItem.key] ?
                                <ChevronDown className="w-4 h-4" /> :
                                <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          {sidebarOpen && subItem.subItems && dropdownOpen[subItem.key] && (
                            <div className="ml-10 space-y-1 mt-1">
                              {subItem.subItems.map((sub, i) => (
                                <Link
                                  key={i}
                                  href={sub.path}
                                  className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-all duration-200 ${isActive(sub.path)
                                      ? 'bg-red-800 text-white font-semibold border-l-4 border-yellow-400'
                                      : 'text-red-100 hover:text-white hover:bg-red-600'
                                    }`}
                                >
                                  <sub.icon className="w-4 h-4 flex-shrink-0" />
                                  <span>{sub.label}</span>
                                </Link>
                              ))}

                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 group relative ${isActive(item.path)
                    ? 'bg-red-800 text-white shadow-lg'
                    : 'hover:bg-red-600'
                    }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-yellow-300' : ''}`} />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  {isActive(item.path) && (
                    <div className="w-1 h-8 bg-yellow-400 rounded-full absolute right-2"></div>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-red-500 bg-red-700">
          <div className="bg-red-600 rounded-lg p-3 shadow-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} text-red-100`} />
            </div>
            {sidebarOpen && (
              <>
                <p className="text-xs text-center text-red-100 mb-1">{formatDate(currentTime)}</p>
                <p className="text-2xl font-bold text-center tracking-wider">{formatTime(currentTime)}</p>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}