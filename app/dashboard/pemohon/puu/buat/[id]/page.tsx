'use client'

import { FileText, ChevronRight, Save, X, File, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PermohonanBaruStep2() {
  const [permohonanId, setPermohonanId] = useState('')
  const [currentPermohonan, setCurrentPermohonan] = useState('')
  const [editedPermohonan, setEditedPermohonan] = useState('')
  
  const [showModalPermohonan, setShowModalPermohonan] = useState(false)
  const [showModalPemohon, setShowModalPemohon] = useState(false)
  const [showModalKuasa, setShowModalKuasa] = useState(false)
  const [showModalBerkas, setShowModalBerkas] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ type: '', message: '', onConfirm: null })
  
  const [pemohonList, setPemohonList] = useState([
    {
      id: 1,
      nama: 'John Doe',
      alamat: 'Jl. Merdeka No. 123, Jakarta',
      nik: '3171234567890001',
      email: 'john.doe@email.com',
      noTelp: '021-1234567',
      noHp: '081234567890'
    }
  ])

  const [kuasaList, setKuasaList] = useState([
    {
      id: 1,
      nama: 'Ahmad Santoso SH',
      alamat: 'Jl. Sudirman No. 45, Jakarta',
      nik: '3171234567890002',
      email: 'ahmad.santoso@law.com',
      noTelp: '021-7654321',
      noHp: '082345678901'
    }
  ])

  const [berkasList, setBerkasList] = useState([
    { id: 1, nama: 'Permohonan (pdf)', status: 'Belum di Upload', required: true },
    { id: 2, nama: 'Permohonan (doc/docx)', status: 'Belum di Upload', required: true },
    { id: 3, nama: 'Daftar Alat Bukti (pdf)', status: 'Belum di Upload', required: false },
    { id: 4, nama: 'Daftar Alat Bukti (doc/docx)', status: 'Belum di Upload', required: false },
    { id: 5, nama: 'Alat Bukti', status: 'Belum di Upload', required: false }
  ])

  const [formPemohon, setFormPemohon] = useState({
    id: null,
    nama: '',
    alamat: '',
    nik: '',
    email: '',
    noTelp: '',
    noHp: ''
  })

  const [formKuasa, setFormKuasa] = useState({
    id: null,
    nama: '',
    alamat: '',
    nik: '',
    email: '',
    noTelp: '',
    noHp: ''
  })

  const [formBerkas, setFormBerkas] = useState({
    nama: '',
    file: ''
  })

  useEffect(() => {
    const pathParts = window.location.pathname.split('/')
    const id = pathParts[pathParts.length - 1]
    setPermohonanId(id)
    
    const savedData = localStorage.getItem(`permohonan_${id}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      setCurrentPermohonan(data.uraianPermohonan)
      setEditedPermohonan(data.uraianPermohonan)
    }
  }, [])

  const handleEditPermohonan = () => {
    setEditedPermohonan(currentPermohonan)
    setShowModalPermohonan(true)
  }

  const handleSavePermohonan = () => {
    setCurrentPermohonan(editedPermohonan)
    setShowModalPermohonan(false)
    
    const savedData = localStorage.getItem(`permohonan_${permohonanId}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      data.uraianPermohonan = editedPermohonan
      localStorage.setItem(`permohonan_${permohonanId}`, JSON.stringify(data))
    }
  }

  const handleAddPemohon = () => {
    setFormPemohon({ id: null, nama: '', alamat: '', nik: '', email: '', noTelp: '', noHp: '' })
    setShowModalPemohon(true)
  }

  const handleEditPemohon = (pemohon) => {
    setFormPemohon(pemohon)
    setShowModalPemohon(true)
  }

  const handleSavePemohon = () => {
    if (formPemohon.id) {
      setPemohonList(pemohonList.map(p => p.id === formPemohon.id ? formPemohon : p))
    } else {
      setPemohonList([...pemohonList, { ...formPemohon, id: Date.now() }])
    }
    setShowModalPemohon(false)
  }

  const handleDeletePemohon = (id) => {
    setAlertConfig({
      type: 'confirm',
      message: 'Apakah Anda yakin ingin menghapus data pemohon ini?',
      onConfirm: () => {
        setPemohonList(pemohonList.filter(p => p.id !== id))
        setShowAlert(false)
      }
    })
    setShowAlert(true)
  }

  const handleAddKuasa = () => {
    setFormKuasa({ id: null, nama: '', alamat: '', nik: '', email: '', noTelp: '', noHp: '' })
    setShowModalKuasa(true)
  }

  const handleEditKuasa = (kuasa) => {
    setFormKuasa(kuasa)
    setShowModalKuasa(true)
  }

  const handleSaveKuasa = () => {
    if (formKuasa.id) {
      setKuasaList(kuasaList.map(k => k.id === formKuasa.id ? formKuasa : k))
    } else {
      setKuasaList([...kuasaList, { ...formKuasa, id: Date.now() }])
    }
    setShowModalKuasa(false)
  }

  const handleDeleteKuasa = (id) => {
    setAlertConfig({
      type: 'confirm',
      message: 'Apakah Anda yakin ingin menghapus data kuasa ini?',
      onConfirm: () => {
        setKuasaList(kuasaList.filter(k => k.id !== id))
        setShowAlert(false)
      }
    })
    setShowAlert(true)
  }

  const handleUploadBerkas = (id) => {
    setBerkasList(berkasList.map(b => 
      b.id === id ? { ...b, status: 'Sudah di Upload' } : b
    ))
  }

  const handleAddBerkas = () => {
    if (formBerkas.nama && formBerkas.file) {
      setBerkasList([...berkasList, {
        id: Date.now(),
        nama: formBerkas.nama,
        status: 'Sudah di Upload',
        required: false
      }])
      setFormBerkas({ nama: '', file: '' })
      setShowModalBerkas(false)
    }
  }

  const handleDeleteBerkas = (id) => {
    setAlertConfig({
      type: 'confirm',
      message: 'Apakah Anda yakin ingin menghapus berkas ini?',
      onConfirm: () => {
        setBerkasList(berkasList.filter(b => b.id !== id))
        setShowAlert(false)
      }
    })
    setShowAlert(true)
  }

  const handleBatal = () => {
    setAlertConfig({
      type: 'confirm',
      message: 'Apakah Anda yakin ingin membatalkan dan menghapus permohonan ini?',
      onConfirm: () => {
        localStorage.removeItem(`permohonan_${permohonanId}`)
        setShowAlert(false)
        window.location.href = '/dashboard/pemohon/puu/buat'
      }
    })
    setShowAlert(true)
  }

  const handleSimpanSementara = () => {
    const dataToSave = {
      id: permohonanId,
      uraianPermohonan: currentPermohonan,
      pemohonList,
      kuasaList,
      berkasList,
      status: 'draft',
      updatedAt: new Date().toISOString()
    }
    
    localStorage.setItem(`permohonan_${permohonanId}`, JSON.stringify(dataToSave))
    
    setAlertConfig({
      type: 'success',
      message: 'Permohonan berhasil disimpan sementara',
      onConfirm: () => setShowAlert(false)
    })
    setShowAlert(true)
  }

  const handleKirimPermohonan = () => {
    setAlertConfig({
      type: 'confirm',
      message: 'Apakah Anda yakin ingin mengirim permohonan ini?',
      onConfirm: () => {
        const dataToSave = {
          id: permohonanId,
          uraianPermohonan: currentPermohonan,
          pemohonList,
          kuasaList,
          berkasList,
          status: 'submitted',
          submittedAt: new Date().toISOString()
        }
        
        localStorage.setItem(`permohonan_${permohonanId}`, JSON.stringify(dataToSave))
        
        setShowAlert(false)
        setAlertConfig({
          type: 'success',
          message: 'Permohonan berhasil dikirim',
          onConfirm: () => {
            setShowAlert(false)
            window.location.href = '/permohonan'
          }
        })
        setShowAlert(true)
      }
    })
    setShowAlert(true)
  }

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    )
  }

  const SweetAlert = ({ config, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              config.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              {config.type === 'success' ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <CheckCircle className="w-8 h-8 text-blue-600" />
              )}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            {config.type === 'success' ? 'Berhasil!' : 'Konfirmasi'}
          </h3>
          <p className="text-gray-600 text-center mb-6">{config.message}</p>
          <div className="flex gap-3">
            {config.type === 'confirm' ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={config.onConfirm}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Ya
                </button>
              </>
            ) : (
              <button
                onClick={config.onConfirm}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                OK
              </button>
            )}
          </div>
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
        <span className="text-gray-900 font-semibold">Buat Permohonan</span>
      </nav>

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Pengisian Data Permohonan
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
        {permohonanId && (
          <p className="text-sm text-gray-500 mt-2">ID Permohonan: {permohonanId}</p>
        )}
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                ✓
              </div>
              <span className="text-sm md:text-base font-medium text-gray-500">Proses Pengisian</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white font-bold text-sm">
                2
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-900">Pengisian Data</span>
            </div>
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-green-500 to-red-600 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 md:p-6 border border-red-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Permohonan</h3>
                  <p className="text-sm md:text-base text-gray-700 break-words">{currentPermohonan}</p>
                </div>
              </div>
              <button
                onClick={handleEditPermohonan}
                className="flex-shrink-0 bg-white text-red-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-50 transition-all border border-red-200"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900">Data Pemohon</h3>
            </div>
            <button
              onClick={handleAddPemohon}
              className="mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
            >
              <FileText className="w-4 h-4" />
              Tambah Pemohon
            </button>
            
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">No</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Alamat</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">NIK</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">No. Telp</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">No. HP</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pemohonList.map((pemohon, index) => (
                    <tr key={pemohon.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm">{pemohon.nama}</td>
                      <td className="px-4 py-3 text-sm">{pemohon.alamat}</td>
                      <td className="px-4 py-3 text-sm">{pemohon.nik}</td>
                      <td className="px-4 py-3 text-sm">{pemohon.email}</td>
                      <td className="px-4 py-3 text-sm">{pemohon.noTelp}</td>
                      <td className="px-4 py-3 text-sm">{pemohon.noHp}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPemohon(pemohon)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePemohon(pemohon.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {pemohonList.map((pemohon, index) => (
                <div key={pemohon.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-gray-900">#{index + 1}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPemohon(pemohon)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePemohon(pemohon.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Nama</p>
                    <p className="text-sm font-medium text-gray-900">{pemohon.nama}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Alamat</p>
                    <p className="text-sm text-gray-700">{pemohon.alamat}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">NIK</p>
                      <p className="text-sm text-gray-700">{pemohon.nik}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-700 break-all">{pemohon.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">No. Telp</p>
                      <p className="text-sm text-gray-700">{pemohon.noTelp}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">No. HP</p>
                      <p className="text-sm text-gray-700">{pemohon.noHp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900">Data Kuasa</h3>
            </div>
            <button
              onClick={handleAddKuasa}
              className="mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
            >
              <FileText className="w-4 h-4" />
              Tambah Data Kuasa
            </button>
            
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">No</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Alamat</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">NIK</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">No. Telp</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">No. HP</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kuasaList.map((kuasa, index) => (
                    <tr key={kuasa.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm">{kuasa.nama}</td>
                      <td className="px-4 py-3 text-sm">{kuasa.alamat}</td>
                      <td className="px-4 py-3 text-sm">{kuasa.nik}</td>
                      <td className="px-4 py-3 text-sm">{kuasa.email}</td>
                      <td className="px-4 py-3 text-sm">{kuasa.noTelp}</td>
                      <td className="px-4 py-3 text-sm">{kuasa.noHp}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditKuasa(kuasa)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteKuasa(kuasa.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {kuasaList.map((kuasa, index) => (
                <div key={kuasa.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-gray-900">#{index + 1}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditKuasa(kuasa)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteKuasa(kuasa.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Nama</p>
                    <p className="text-sm font-medium text-gray-900">{kuasa.nama}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Alamat</p>
                    <p className="text-sm text-gray-700">{kuasa.alamat}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">NIK</p>
                      <p className="text-sm text-gray-700">{kuasa.nik}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-700 break-all">{kuasa.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">No. Telp</p>
                      <p className="text-sm text-gray-700">{kuasa.noTelp}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">No. HP</p>
                      <p className="text-sm text-gray-700">{kuasa.noHp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <File className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900">Berkas Permohonan</h3>
            </div>
            
            <div className="hidden md:block overflow-x-auto mb-4">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">No</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Kelengkapan</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Ada/Tidak Ada</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {berkasList.map((berkas, index) => (
                    <tr key={berkas.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm">
                        {berkas.nama} {berkas.required && <span className="text-red-600">*</span>}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
                          berkas.status === 'Sudah di Upload' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {berkas.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUploadBerkas(berkas.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Upload
                          </button>
                          {!berkas.required && (
                            <button
                              onClick={() => handleDeleteBerkas(berkas.id)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3 mb-4">
              {berkasList.map((berkas, index) => (
                <div key={berkas.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">#{index + 1}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                      berkas.status === 'Sudah di Upload' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {berkas.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Kelengkapan</p>
                    <p className="text-sm font-medium text-gray-900">
                      {berkas.nama} {berkas.required && <span className="text-red-600">*</span>}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUploadBerkas(berkas.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Upload
                    </button>
                    {!berkas.required && (
                      <button
                        onClick={() => handleDeleteBerkas(berkas.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-bold text-amber-900 mb-2">Catatan:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-amber-900">
                <li>Mohon alat bukti diberi keterangan kode bukti dan di leges</li>
                <li>Ukuran file maksimal 25MB</li>
              </ol>
            </div>

            <button
              onClick={() => setShowModalBerkas(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
            >
              <FileText className="w-4 h-4" />
              Tambah Berkas
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleBatal}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all"
            >
              <X className="w-5 h-5" />
              Batal
            </button>
            <button
              onClick={handleSimpanSementara}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Save className="w-5 h-5" />
              Simpan Sementara
            </button>
            <button
              onClick={handleKirimPermohonan}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              Kirim Permohonan
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModalPermohonan} onClose={() => setShowModalPermohonan(false)} title="Edit Permohonan">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Uraian Permohonan</label>
            <input
              type="text"
              value={editedPermohonan}
              onChange={(e) => setEditedPermohonan(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowModalPermohonan(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={handleSavePermohonan}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={showModalPemohon} onClose={() => setShowModalPemohon(false)} title={formPemohon.id ? "Edit Pemohon" : "Tambah Pemohon"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
            <input
              type="text"
              value={formPemohon.nama}
              onChange={(e) => setFormPemohon({ ...formPemohon, nama: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
            <textarea
              value={formPemohon.alamat}
              onChange={(e) => setFormPemohon({ ...formPemohon, alamat: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">NIK</label>
            <input
              type="text"
              value={formPemohon.nik}
              onChange={(e) => setFormPemohon({ ...formPemohon, nik: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formPemohon.email}
              onChange={(e) => setFormPemohon({ ...formPemohon, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
              <input
                type="text"
                value={formPemohon.noTelp}
                onChange={(e) => setFormPemohon({ ...formPemohon, noTelp: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">No. HP</label>
              <input
                type="text"
                value={formPemohon.noHp}
                onChange={(e) => setFormPemohon({ ...formPemohon, noHp: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowModalPemohon(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={handleSavePemohon}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={showModalKuasa} onClose={() => setShowModalKuasa(false)} title={formKuasa.id ? "Edit Kuasa" : "Tambah Kuasa"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
            <input
              type="text"
              value={formKuasa.nama}
              onChange={(e) => setFormKuasa({ ...formKuasa, nama: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
            <textarea
              value={formKuasa.alamat}
              onChange={(e) => setFormKuasa({ ...formKuasa, alamat: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">NIK</label>
            <input
              type="text"
              value={formKuasa.nik}
              onChange={(e) => setFormKuasa({ ...formKuasa, nik: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formKuasa.email}
              onChange={(e) => setFormKuasa({ ...formKuasa, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
              <input
                type="text"
                value={formKuasa.noTelp}
                onChange={(e) => setFormKuasa({ ...formKuasa, noTelp: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">No. HP</label>
              <input
                type="text"
                value={formKuasa.noHp}
                onChange={(e) => setFormKuasa({ ...formKuasa, noHp: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowModalKuasa(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={handleSaveKuasa}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={showModalBerkas} onClose={() => setShowModalBerkas(false)} title="Tambah Berkas">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Berkas</label>
            <input
              type="text"
              value={formBerkas.nama}
              onChange={(e) => setFormBerkas({ ...formBerkas, nama: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">File Berkas</label>
            <input
              type="file"
              onChange={(e) => setFormBerkas({ ...formBerkas, file: e.target.files[0]?.name || '' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowModalBerkas(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={handleAddBerkas}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>

      {showAlert && (
        <SweetAlert config={alertConfig} onClose={() => setShowAlert(false)} />
      )}
    </div>
  )
}