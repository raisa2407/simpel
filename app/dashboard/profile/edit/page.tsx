'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Phone, CreditCard, MapPin, Camera, Save, X, ChevronRight, AlertCircle } from 'lucide-react'
import Alert from '@/components/ui/alert'

export default function EditProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [formData, setFormData] = useState({
    nama: '',
    noTelp: '',
    nik: '',
    alamat: '',
    fotoKtp: ''
  })
  const [previewKtp, setPreviewKtp] = useState('')
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false)

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
      const response = await fetch('http://localhost:3001/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      
      const incomplete = !data.nik || !data.alamat || !data.fotoKtp
      setIsProfileIncomplete(incomplete)
      
      setUserData(data)
      setFormData({
        nama: data.nama || '',
        noTelp: data.noTelp || '',
        nik: data.nik || '',
        alamat: data.alamat || '',
        fotoKtp: data.fotoKtp || ''
      })
      setPreviewKtp(data.fotoKtp || '')
    } catch (error) {
      console.error('Error fetching profile:', error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      router.push('/login')
    } finally {
      setFetching(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAlert({ type: 'error', message: 'Ukuran file maksimal 5MB' })
        return
      }

      if (!file.type.startsWith('image/')) {
        setAlert({ type: 'error', message: 'File harus berupa gambar' })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewKtp(reader.result as string)
        setFormData({ ...formData, fotoKtp: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    if (!formData.nama.trim()) {
      setAlert({ type: 'error', message: 'Nama harus diisi' })
      return false
    }

    if (formData.nama.trim().length < 3) {
      setAlert({ type: 'error', message: 'Nama minimal 3 karakter' })
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

    if (!formData.nik.trim()) {
      setAlert({ type: 'error', message: 'Nomor KTP harus diisi' })
      return false
    }

    if (formData.nik.length !== 16) {
      setAlert({ type: 'error', message: 'Nomor KTP harus tepat 16 digit' })
      return false
    }

    if (!/^[0-9]+$/.test(formData.nik)) {
      setAlert({ type: 'error', message: 'Nomor KTP hanya boleh angka' })
      return false
    }

    if (!formData.alamat.trim()) {
      setAlert({ type: 'error', message: 'Alamat harus diisi' })
      return false
    }

    if (formData.alamat.trim().length < 10) {
      setAlert({ type: 'error', message: 'Alamat minimal 10 karakter' })
      return false
    }

    if (!formData.fotoKtp) {
      setAlert({ type: 'error', message: 'Foto KTP harus diupload' })
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:3001/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Gagal memperbarui profil')
      }

      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data))
      
      setAlert({ type: 'success', message: isProfileIncomplete ? 'Profil berhasil dilengkapi!' : 'Profil berhasil diperbarui!' })
      
      setTimeout(() => {
        router.push('/dashboard/profile')
      }, 1500)
    } catch (error: any) {
      setAlert({ type: 'error', message: error.message || 'Terjadi kesalahan' })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}

      {isProfileIncomplete && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900 mb-1">Profil Belum Lengkap</p>
              <p className="text-sm text-yellow-800">
                Anda harus melengkapi profil terlebih dahulu sebelum dapat mengakses menu lainnya.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isProfileIncomplete && (
        <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/dashboard/profile" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Profile
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">Edit Profile</span>
        </nav>
      )}

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            {isProfileIncomplete ? 'Lengkapi Profile' : 'Edit Profile'}
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
        <p className="text-gray-600 mt-4">
          {isProfileIncomplete ? 'Isi data berikut untuk melanjutkan' : 'Perbarui informasi profil Anda'}
        </p>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10">
        <div className="space-y-6">
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimal 3 karakter</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={userData?.email}
                readOnly
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed text-sm md:text-base"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                placeholder="08123456789"
                required
                minLength={10}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimal 10 digit</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor KTP <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                placeholder="3171234567890001"
                required
                maxLength={16}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Harus tepat 16 digit</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                rows={4}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base resize-none"
                placeholder="Alamat lengkap"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimal 10 karakter</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto KTP <span className="text-red-600">*</span>
            </label>
            {previewKtp && (
              <div className="mb-4">
                <img
                  src={previewKtp}
                  alt="Preview KTP"
                  className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-gray-300"
                />
              </div>
            )}
            <div className="relative">
              <input
                type="file"
                id="file-ktp-edit"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-ktp-edit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
              >
                <Camera className="w-5 h-5" />
                {previewKtp ? 'Ubah Foto KTP' : 'Upload Foto KTP'}
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG. Maksimal 5MB</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {!isProfileIncomplete && (
              <button
                onClick={() => router.push('/dashboard/profile')}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                <X className="w-5 h-5" />
                Batal
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Menyimpan...' : (isProfileIncomplete ? 'Simpan & Lanjutkan' : 'Simpan Perubahan')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}