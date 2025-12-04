'use client'

import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function JadwalPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1))
  
  const jadwal = [
    {
      id: 1,
      nomor: 'JDW/2025/001',
      hari: 'Senin',
      tanggal: '4 November 2025',
      acara: 'Sidang Permohonan Izin Usaha'
    },
    {
      id: 2,
      nomor: 'JDW/2025/002',
      hari: 'Rabu',
      tanggal: '6 November 2025',
      acara: 'Verifikasi Dokumen'
    }
  ]

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getEventType = (day) => {
    if (day === 4) return 'permohonan'
    if (day === 6) return 'permintaan'
    if (day === 10) return 'keduanya'
    if (day === 17) return 'libur'
    return null
  }

  const days = getDaysInMonth(currentDate)

  return (
   
      <div className="max-w-7xl mx-auto space-y-3 md:space-y-6">
           <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Jadwal</span>
      </nav>

      <div className="mb-8 sm:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative">
            Jadwal Sidang
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
        </div>
      </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2.5 md:p-4 rounded-lg md:rounded-xl shadow-lg shadow-red-200 flex-shrink-0">
                <Calendar className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight">Kalender Sidang</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Lihat jadwal acara sidang</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  const eventType = day ? getEventType(day) : null
                  return (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                        day
                          ? eventType === 'permohonan'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : eventType === 'permintaan'
                            ? 'bg-green-100 text-green-700 font-semibold'
                            : eventType === 'keduanya'
                            ? 'bg-purple-100 text-purple-700 font-semibold'
                            : eventType === 'libur'
                            ? 'bg-red-100 text-red-700 font-semibold'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          : ''
                      }`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
                  <span className="text-xs md:text-sm text-gray-700">Sidang</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
                  <span className="text-xs md:text-sm text-gray-700">Putusan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-100 border-2 border-purple-500 rounded"></div>
                  <span className="text-xs md:text-sm text-gray-700">Keduanya</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
                  <span className="text-xs md:text-sm text-gray-700">Libur</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2.5 md:p-4 rounded-lg md:rounded-xl shadow-lg shadow-red-200 flex-shrink-0">
                <Calendar className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight">Jadwal Sidang</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Daftar acara sidang mendatang</p>
              </div>
            </div>

            {jadwal.length > 0 ? (
              <>
                <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                          Nomor Perkara
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                          Hari, Tanggal
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                          Acara Sidang
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {jadwal.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">{index + 1}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">{item.nomor}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.hari}</p>
                              <p className="text-xs text-gray-500">{item.tanggal}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-700">{item.acara}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-3">
                  {jadwal.map((item, index) => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3.5 space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 bg-white text-gray-700 text-xs font-bold rounded-full border border-gray-300">
                          {index + 1}
                        </span>
                        <span className="text-xs font-semibold text-gray-900">{item.nomor}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Hari, Tanggal</p>
                          <p className="text-sm font-semibold text-gray-900">{item.hari}, {item.tanggal}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Acara</p>
                          <p className="text-sm text-gray-700">{item.acara}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3">
                  <Calendar className="w-8 h-8 text-gray-400" strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Tidak ada jadwal</h3>
                <p className="text-xs text-gray-500">Belum ada acara yang terjadwal</p>
              </div>
            )}
          </div>
        </div>
      </div>
   
  )
}