'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Bell, User, ChevronDown, Menu, X, LogOut } from 'lucide-react'


interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const router = useRouter()
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        setUserName(userData.nama || 'User')
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-red-500 p-2 rounded-lg transition-all duration-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex items-center space-x-4">
          <button className="relative text-white hover:bg-red-500 p-2 rounded-lg transition-all duration-200">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-3 text-white hover:bg-red-500 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-medium hidden sm:block">{userName}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {profileDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setProfileDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  <Link
                    href="/dashboard/profile" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdown(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}