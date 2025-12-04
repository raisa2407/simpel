'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import Alert from '@/components/ui/alert'
import { api } from '../../lib/api'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    noTelp: ''
  })
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!formData.nama.trim()) {
      setAlert({ type: 'error', message: 'Nama lengkap harus diisi' })
      return false
    }

    if (formData.nama.trim().length < 3) {
      setAlert({ type: 'error', message: 'Nama minimal 3 karakter' })
      return false
    }

    if (!formData.email.trim()) {
      setAlert({ type: 'error', message: 'Email harus diisi' })
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setAlert({ type: 'error', message: 'Format email tidak valid' })
      return false
    }

    if (!formData.noTelp.trim()) {
      setAlert({ type: 'error', message: 'Nomor telepon harus diisi' })
      return false
    }

    if (formData.noTelp.length < 10) {
      setAlert({ type: 'error', message: 'Nomor telepon minimal 10 digit' })
      return false
    }

    if (!/^[0-9]+$/.test(formData.noTelp)) {
      setAlert({ type: 'error', message: 'Nomor telepon hanya boleh angka' })
      return false
    }

    if (!formData.password) {
      setAlert({ type: 'error', message: 'Password harus diisi' })
      return false
    }

    if (formData.password.length < 6) {
      setAlert({ type: 'error', message: 'Password minimal 6 karakter' })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setAlert(null)
    setLoading(true)

    try {
      const response = await api("/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: 'Registrasi gagal' }))
        throw new Error(data.message || 'Registrasi gagal')
      }

      const data = await response.json()

      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      setAlert({ type: 'success', message: 'Registrasi berhasil! Silakan lengkapi profil Anda' })
      
      setTimeout(() => {
        router.push('/dashboard/profile/edit')
      }, 1500)
    } catch (err: any) {
      console.error('Register error:', err)
      if (err.message === 'Failed to fetch') {
        setAlert({ type: 'error', message: 'Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:3001' })
      } else {
        setAlert({ type: 'error', message: err.message || 'Terjadi kesalahan' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Daftar Akun</h1>
          <p className="text-sm sm:text-base text-gray-600">Buat akun baru Anda</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                No. Telepon <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.noTelp}
                  onChange={(e) => setFormData({ ...formData, noTelp: e.target.value.replace(/\D/g, '') })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="081234567890"
                  required
                  minLength={10}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimal 10 digit</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="Minimal 6 karakter"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-red-600 font-semibold hover:text-red-700">
                Login di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}