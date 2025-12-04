'use client'

import { FileText, Plus, ChevronRight, Info, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function PemohonPage() {
    const contohFiles = [
        {
            id: 1,
            nama: 'Permohonan Awal Pengujian Undang-Undang (PUU)',
            deskripsi: 'Contoh Permohonan Awal Pengujian Undang-Undang (PUU)',
            file: '/file/Permohonan-Awal-PUU.pdf'
        },
        {
            id: 2,
            nama: 'Permohonan Perbaikan Pengujian Undang-Undang (PUU)',
            deskripsi: 'Contoh Permohonan Perbaikan Pengujian Undang-Undang (PUU)',
            file: '/file/Permohonan-Perbaikan-PUU.pdf'
        },
        {
            id: 3,
            nama: 'Permohonan Sengketa Kewenangan Lembaga Negara (SKLN)',
            deskripsi: 'Contoh Permohonan Sengketa Kewenangan Lembaga Negara (SKLN)',
            file: '/file/3-SKLN-X-2012.1.2 (Perbaikan Permohonan).pdf'
        },
        {
            id: 4,
            nama: 'Permohonan Perselisihan Hasil Pemilihan Umum (PHPU)',
            deskripsi: 'Contoh Permohonan Perselisihan Hasil Pemilihan Umum (PHPU)',
            file: '/file/04-03-31-PHPU-DPR-DPRD-XII-2014 01.2 (PERBAIKAN PERMOHONAN).pdf'
        },
        {
            id: 5,
            nama: 'Permohonan Perselisihan Hasil Pemilihan Kepala Daerah (PHP KADA)',
            deskripsi: 'Contoh Permohonan Perselisihan Hasil Pemilihan Kepala Daerah (PHP KADA)',
            file: '/file/54-PHP.BUP-XV-2017 1.3 (Perbaikan Permohonan ke-2).pdf'
        },
        {
            id: 6,
            nama: 'Penyusunan Permohonan Pengujian Undang-Undang (PUU) - Materiil',
            deskripsi: 'Template Penyusunan Permohonan Pengujian Undang-Undang (PUU) - Materiil',
            file: '/file/Template-Penyusunan-Permohonan-PUU-Materiil.docx'
        }
    ]

    return (
        <>
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            <div className="max-w-7xl mx-auto">

                <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                        Dashboard
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-semibold">Contoh Permohonan</span>
                </nav>
                <div className="mb-8 sm:mb-10 md:mb-12 text-center px-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-3 sm:mb-4 shadow-lg">
                        <FileText className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>

                    <div className="relative inline-block">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative px-2">
                            Contoh Permohonan
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                        </h1>
                    </div>

                    <p className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
                        Contoh dan Template Permohonan
                    </p>
                </div>
                <div className="mb-8 sm:mb-12">
                    <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                                    File Contoh Permohonan
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    Silakan unduh file contoh permohonan di bawah ini sebagai referensi dalam mengisi dokumen yang diperlukan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                    {contohFiles.map((file, index) => (
                        <a
                            key={file.id}
                            href={file.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:-translate-y-1"
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                            }}
                        >
                            <div className="p-5 sm:p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>
                                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                                    {file.nama}
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                    {file.deskripsi}
                                </p>

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-red-600 group-hover:text-red-700">
                                        Lihat File
                                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </>
    )
}