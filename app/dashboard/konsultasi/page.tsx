'use client'

import { FileText, Plus, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function PUUPage() {
  const [permohonan, setPermohonan] = useState([
    {
      id: 1,
      nomor: 'PMH/2024/001',
      permohonan: 'Permohonan Izin Usaha',
      pemohon: 'PT Maju Jaya / Budiman SH',
      status: 'Diproses'
    },
    {
      id: 2,
      nomor: 'PMH/2024/002',
      permohonan: 'Permohonan Perpanjangan Izin',
      pemohon: 'CV Berkah Sejahtera / Ahmad Santoso SH',
      status: 'Menunggu Berkas'
    }
  ])

  return (

    <div className="max-w-7xl mx-auto space-y-3 md:space-y-6">

      <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Konsultasi</span>
      </nav>

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Konsultasi
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2.5 md:p-4 rounded-lg md:rounded-xl shadow-lg shadow-red-200 flex-shrink-0">
              <FileText className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Riwayat Konsultasi</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">Berikut merupakan riwayat konsultasi anda</p>
            </div>
          </div>
          <Link
            href="/dashboard/pemohon/puu/buat" className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-semibold shadow-lg shadow-red-200 transition-all duration-200 hover:shadow-xl hover:shadow-red-300 hover:-translate-y-0.5 whitespace-nowrap">
            <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            Konsultasi
          </Link>
        </div>

        {permohonan.length > 0 ? (
          <div className="space-y-4 md:space-y-6">

            <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Last Chat
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Review
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {permohonan.map((item, index) => (
                    <tr key={item.id} className="group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">{index + 1}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{item.nomor}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-gray-900">{item.permohonan}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-600">{item.pemohon}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-lg ${item.status === 'Diproses'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {permohonan.map((item, index) => (
                <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3.5 space-y-2.5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 bg-white text-gray-700 text-xs font-bold rounded-full border border-gray-300">
                        {index + 1}
                      </span>
                      <span className="text-xs font-semibold text-gray-900">{item.nomor}</span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded ${item.status === 'Diproses'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Permohonan</p>
                      <p className="text-sm font-semibold text-gray-900">{item.permohonan}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Pemohon/Kuasa</p>
                      <p className="text-xs text-gray-700 break-words">{item.pemohon}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

         
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl md:rounded-2xl mb-3 md:mb-4">
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-gray-400" strokeWidth={2} />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Tidak ada data konsultasi online</h3>
            <p className="text-xs md:text-sm text-gray-500">Buat konsultasi baru untuk memulai</p>
          </div>
        )}
      </div>
    </div>

  )
}