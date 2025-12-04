'use client'

import { User, ChevronRight, Edit, Lock, Mail, Phone, CreditCard, MapPin, Eye, EyeOff, Save, X, Camera, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { api } from '../../../lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProfileApp() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState('profile')
  const [userData, setUserData] = useState({
    nama: '',
    email: '',
    noTelp: '',
    nik: '',
    alamat: '',
    fotoKtp: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchProfile()
  }, [])

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

  const renderView = () => {
    switch (currentView) {
      case 'profile':
        return <ProfileView userData={userData} setCurrentView={setCurrentView} />
      case 'edit-profile':
        return <EditProfileView userData={userData} setUserData={setUserData} setCurrentView={setCurrentView} fetchProfile={fetchProfile} />
      case 'reset-password':
        return <ResetPasswordView setCurrentView={setCurrentView} />
      default:
        return <ProfileView userData={userData} setCurrentView={setCurrentView} />
    }
  }

  return <div className="min-h-screen bg-gray-50">{renderView()}</div>
}

function ProfileView({ userData, setCurrentView }) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <nav className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">Profile</span>
        </div>

      </nav>

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Profile Pengguna
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={2} />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{userData.nama}</h2>
          <p className="text-sm md:text-base text-gray-500">Pengguna Terdaftar</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-500 mb-1">Nomor KTP</p>
                <p className="text-sm md:text-base font-semibold text-gray-900 break-all">{userData.nik}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-500 mb-1">Email</p>
                <p className="text-sm md:text-base font-semibold text-gray-900 break-all">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-500 mb-1">No. Telepon / HP</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">{userData.noTelp}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-500 mb-1">Alamat</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">{userData.alamat}</p>
              </div>
            </div>
          </div>

          {userData.fotoKtp && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-5">
              <div className="flex flex-col gap-3">
                <p className="text-xs md:text-sm text-gray-500">Foto KTP</p>
                <img
                  src={userData.fotoKtp}
                  alt="KTP"
                  className="w-full max-w-md rounded-lg border-2 border-gray-300"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <button
            onClick={() => setCurrentView('edit-profile')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 md:py-4 rounded-xl font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </button>
          <button
            onClick={() => setCurrentView('reset-password')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 md:py-4 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Lock className="w-5 h-5" />
            Reset Password
          </button>
        </div>
      </div>
    </div>
  )
}

function EditProfileView({ userData, setUserData, setCurrentView, fetchProfile }) {
  const [formData, setFormData] = useState({ ...userData })
  const [previewKtp, setPreviewKtp] = useState(userData.fotoKtp)
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAlertConfig({ type: 'error', message: 'Ukuran file maksimal 5MB' })
        setShowAlert(true)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewKtp(reader.result)
        setFormData({ ...formData, fotoKtp: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSimpan = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      const response = await api("/users/profile", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nama: formData.nama,
          noTelp: formData.noTelp,
          nik: formData.nik,
          alamat: formData.alamat,
          fotoKtp: formData.fotoKtp
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Gagal memperbarui profile')
      }

      const data = await response.json()
      setUserData(data)
      await fetchProfile()

      setAlertConfig({ type: 'success', message: 'Profile berhasil diperbarui' })
      setShowAlert(true)
    } catch (error) {
      setAlertConfig({ type: 'error', message: error.message || 'Terjadi kesalahan' })
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
  }

  const handleAlertClose = () => {
    setShowAlert(false)
    if (alertConfig.type === 'success') {
      setCurrentView('profile')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button onClick={() => setCurrentView('profile')} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Profile
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Edit Profile</span>
      </nav>

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Edit Profile
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed text-sm md:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              No. Telepon / HP <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.noTelp}
              onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor KTP <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="Masukkan nomor KTP"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              File KTP
            </label>
            {previewKtp && (
              <div className="mb-4 relative group">
                <img
                  src={previewKtp}
                  alt="Preview KTP"
                  className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-gray-300"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center max-w-md">
                  <p className="text-white text-sm font-semibold">Klik tombol di bawah untuk mengubah</p>
                </div>
              </div>
            )}
            <div className="relative">
              <input
                type="file"
                id="file-ktp"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-ktp"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all w-full sm:w-auto"
              >
                <Camera className="w-5 h-5" />
                {previewKtp ? 'Ubah File KTP' : 'Upload File KTP'}
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG. Maksimal 5MB</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat <span className="text-red-600">*</span>
            </label>
            <textarea
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base resize-none"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => setCurrentView('profile')}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              <X className="w-5 h-5" />
              Batal
            </button>
            <button
              onClick={handleSimpan}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${alertConfig.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                {alertConfig.type === 'success' ? (
                  <Save className="w-8 h-8 text-green-600" />
                ) : (
                  <X className="w-8 h-8 text-red-600" />
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {alertConfig.type === 'success' ? 'Berhasil!' : 'Gagal!'}
            </h3>
            <p className="text-gray-600 text-center mb-6">{alertConfig.message}</p>
            <button
              onClick={handleAlertClose}
              className={`w-full py-3 rounded-xl font-semibold hover:shadow-lg transition-all ${alertConfig.type === 'success'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ResetPasswordView({ setCurrentView }) {
  const [formData, setFormData] = useState({
    passwordLama: '',
    passwordBaru: '',
    konfirmasiPassword: ''
  })
  const [showPassword, setShowPassword] = useState({
    passwordLama: false,
    passwordBaru: false,
    konfirmasiPassword: false
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const toggleShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] })
  }

  const handleSubmit = async () => {
    if (!formData.passwordLama || !formData.passwordBaru || !formData.konfirmasiPassword) {
      setAlertConfig({
        type: 'error',
        message: 'Semua field wajib diisi'
      })
      setShowAlert(true)
      return
    }

    if (formData.passwordBaru !== formData.konfirmasiPassword) {
      setAlertConfig({
        type: 'error',
        message: 'Password baru dan konfirmasi password tidak cocok'
      })
      setShowAlert(true)
      return
    }

    if (formData.passwordBaru.length < 6) {
      setAlertConfig({
        type: 'error',
        message: 'Password baru minimal 6 karakter'
      })
      setShowAlert(true)
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      const response = await api("/users/change-password", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          passwordLama: formData.passwordLama,
          passwordBaru: formData.passwordBaru
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Gagal mengubah password')
      }

      setAlertConfig({
        type: 'success',
        message: 'Password berhasil diubah'
      })
      setShowAlert(true)
    } catch (error) {
      setAlertConfig({
        type: 'error',
        message: error.message || 'Terjadi kesalahan'
      })
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
  }

  const handleAlertClose = () => {
    setShowAlert(false)
    if (alertConfig.type === 'success') {
      setCurrentView('profile')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button onClick={() => setCurrentView('profile')} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Profile
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Reset Password</span>
      </nav>

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Reset Password
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-200 rounded-lg p-2 flex-shrink-0">
                <Lock className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-blue-900 mb-1">Informasi Keamanan</h3>
                <p className="text-xs text-blue-800">
                  Pastikan password baru Anda kuat dan berbeda dari password sebelumnya. Minimal 6 karakter.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password Lama <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.passwordLama ? 'text' : 'password'}
                value={formData.passwordLama}
                onChange={(e) => setFormData({ ...formData, passwordLama: e.target.value })}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                placeholder="Masukkan password lama"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword('passwordLama')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.passwordLama ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password Baru <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.passwordBaru ? 'text' : 'password'}
                value={formData.passwordBaru}
                onChange={(e) => setFormData({ ...formData, passwordBaru: e.target.value })}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword('passwordBaru')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.passwordBaru ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Konfirmasi Password Baru <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.konfirmasiPassword ? 'text' : 'password'}
                value={formData.konfirmasiPassword}
                onChange={(e) => setFormData({ ...formData, konfirmasiPassword: e.target.value })}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                placeholder="Konfirmasi password baru"
              />
              <button type="button"
                onClick={() => toggleShowPassword('konfirmasiPassword')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.konfirmasiPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => setCurrentView('profile')}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              <X className="w-5 h-5" />
              Batal
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="w-5 h-5" />
              {loading ? 'Mengubah...' : 'Update Password'}
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${alertConfig.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                {alertConfig.type === 'success' ? (
                  <Lock className="w-8 h-8 text-green-600" />
                ) : (
                  <X className="w-8 h-8 text-red-600" />
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {alertConfig.type === 'success' ? 'Berhasil!' : 'Gagal!'}
            </h3>
            <p className="text-gray-600 text-center mb-6">{alertConfig.message}</p>
            <button
              onClick={handleAlertClose}
              className={`w-full py-3 rounded-xl font-semibold hover:shadow-lg transition-all ${alertConfig.type === 'success'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}