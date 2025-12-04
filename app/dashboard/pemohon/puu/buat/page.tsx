'use client'

import { FileText, ChevronRight, Save, X, File, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function PermohonanBaruStep1() {
  const [uraianPermohonan, setUraianPermohonan] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState('')

  const documents = [
    { id: 1, name: 'KTP Pemohon (dalam format .jpg)', icon: '📇' },
    { id: 2, name: 'Email Pemohon', icon: '📧' },
    { id: 3, name: 'KTP Kuasa (dalam format .jpg) **', icon: '📇' },
    { id: 4, name: 'Email Kuasa **', icon: '📧' },
    { id: 5, name: 'Surat Kuasa (dalam format .pdf) **', icon: '📑' },
    { id: 6, name: 'File KTA/BAS (bagi advokat) **', icon: '📁' },
    { id: 7, name: 'Permohonan (dalam format .pdf)', icon: '📁' },
    { id: 8, name: 'Permohonan (dalam format .doc/.docx)', icon: '📁' },
    { id: 9, name: 'Daftar alat bukti (dalam format .doc)', icon: '📁' },
    { id: 10, name: 'Alat/dokumen bukti', icon: '📜' }
  ]

  const handleSimpan = () => {
    if (uraianPermohonan.trim() === '') {
      setAlertType('empty')
      setShowAlert(true)
    } else {
      setAlertType('confirm')
      setShowAlert(true)
    }
  }

  const handleConfirmLanjut = async () => {
    setShowAlert(false)
    
    const permohonanId = 'P' + Date.now()
    
    const dataToSave = {
      id: permohonanId,
      uraianPermohonan: uraianPermohonan,
      createdAt: new Date().toISOString(),
      status: 'draft'
    }
    
    localStorage.setItem(`pemohon_${permohonanId}`, JSON.stringify(dataToSave))
    
    window.location.href = `/dashboard/pemohon/puu/buat/${permohonanId}`
  }

  const handleBatal = () => {
    setShowAlert(false)
  }

  const SweetAlert = ({ type, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-fadeIn">
          {type === 'empty' ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Pokok Permohonan Belum Diisi</h3>
              <p className="text-gray-600 text-center mb-6">Silakan isi uraian pokok permohonan terlebih dahulu</p>
              <button
                onClick={onCancel}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                OK
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Lanjutkan Permohonan?</h3>
              <p className="text-gray-600 text-center mb-6">Apakah Anda yakin ingin melanjutkan permohonan ini?</p>
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Ya
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-3 md:space-y-6 p-4">
      <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link href="/dashboard/pemohon/puu/buat" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Permohonan
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Permohonan Online PUU(Pengujian Undang-Undang)</span>
      </nav>

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Pokok Permohonan
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white font-bold text-sm">
                1
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-900">Proses Pengisian Pokok Permohonan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500 font-bold text-sm">
                2
              </div>
              <span className="text-sm md:text-base font-medium text-gray-500">Proses Pengisian Data Permohonan</span>
            </div>
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Uraian Pokok Permohonan <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Uraian pokok permohonan"
              value={uraianPermohonan}
              onChange={(e) => setUraianPermohonan(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
            />
            <p className="text-xs md:text-sm text-gray-500 mt-2">Contoh: Pengujian Materiil Undang-Undang Nomor 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan terhadap UUD 1945</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <File className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900">Dokumen yang Harus Disiapkan</h3>
            </div>
            <div className="space-y-2 mb-4">
              {documents.map((doc, index) => (
                <div key={doc.id} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                  <span className="text-2xl">{doc.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-medium text-gray-900">{doc.name}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">#{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs md:text-sm text-amber-900">
                <span className="font-bold">Keterangan:</span>
              </p>
              <p className="text-xs md:text-sm text-amber-900">
                ** Jika menggunakan kuasa pemohon
              </p>
              <p className="text-xs md:text-sm text-amber-900">Ukuran maksimal untuk masing-masing file adalah 50MB</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              <X className="w-5 h-5" />
              Batal
            </button>
            <button
              onClick={handleSimpan}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Save className="w-5 h-5" />
              Simpan
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <SweetAlert
          type={alertType}
          onConfirm={handleConfirmLanjut}
          onCancel={handleBatal}
        />
      )}
    </div>
  )
}