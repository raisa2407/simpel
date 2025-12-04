'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '../../lib/api'
import { FileText, Send, Package } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchProfile()
  }, [router])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await api("/users/profile", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      if (!data.nik?.trim() || !data.alamat?.trim()) {
        router.push('/dashboard/profile/edit');
        return;
      }


      setUserData(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!userData) return null

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Dashboard
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Selamat datang kembali, {userData?.nama || "Pengguna"}
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 px-1">
            Pengujian Undang-Undang (PUU)
          </h2>
          <Link
            href="/dashboard/pemohon/puu"
            className="block group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-40 sm:h-48 lg:h-64"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300 to-white"></div>
            <img
              src="/img/puu.png"
              alt="PUU"
              className="absolute left-0 top-0 w-1/2 h-full object-cover"
            />
            <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-transparent to-red-300"></div>

            <div className="relative h-full flex items-center justify-end px-4 sm:px-8 lg:px-16">
              <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center border border-red-200/50">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-red-700" />
                </div>

                <div>
                  <h3 className="text-red-900/70 text-xs sm:text-sm lg:text-base font-medium mb-1 sm:mb-2">
                    Total Permohonan PUU
                  </h3>
                  <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-red-900">
                    145
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 px-1">
            Sengketa Kewenangan Lembaga Negara (SKLN)
          </h2>
          <Link
            href="/dashboard/pemohon/skln"
            className="block group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-40 sm:h-48 lg:h-64"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300 to-white"></div>
            <img
              src="/img/skln.png"
              alt="SKLN"
              className="absolute left-0 top-0 w-1/2 h-full object-cover"
            />
            <div className="absolute left-0lara top-0 w-1/2 h-full bg-gradient-to-r from-transparent to-red-300"></div>

            <div className="relative h-full flex items-center justify-end px-4 sm:px-8 lg:px-16">
              <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center border border-red-200/50">
                  <Send className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-red-700" />
                </div>

                <div>
                  <h3 className="text-red-900/70 text-xs sm:text-sm lg:text-base font-medium mb-1 sm:mb-2">
                    Total Permohonan SKLN
                  </h3>
                  <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-red-900">
                    28
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 px-1">
            Perselisihan Hasil Pemilihan Gurbenur, Bupati, dan Walikota
          </h2>
          <a
            href="#"
            className="block group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-40 sm:h-48 lg:h-64"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300 to-white"></div>
            <img
              src="/img/pemilihan.png"
              alt="Pilkada"
              className="absolute left-0 top-0 w-1/2 h-full object-cover"
            />
            <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-transparent to-red-300"></div>

            <div className="relative h-full flex items-center justify-end px-4 sm:px-8 lg:px-16">
              <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center border border-red-200/50">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-red-700" />
                </div>

                <div>
                  <h3 className="text-red-900/70 text-xs sm:text-sm lg:text-base font-medium mb-1 sm:mb-2">
                    Total Permohonan Pilkada
                  </h3>
                  <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-red-900">
                    67
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}