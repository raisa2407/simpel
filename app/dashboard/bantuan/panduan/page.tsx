'use client'

import { ChevronRight, ChevronDown, HelpCircle, Book } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PanduanPage() {

    const panduanItems = [
        {
            id: 1,
            title: "Panduan Permohonan Pemohon PUU (Pengujian Undang-Undang)",
            description: "Langkah-langkah lengkap untuk mengajukan permohonan sebagai pemohon PUU (Pengujian Undang-Undang)",
            href: "/dashboard/bantuan/panduan/pemohon-puu"
        },
        {
            id: 2,
            title: "Panduan Permohonan Pemohon SKLN (Sengketa Kewenangan Lembaga Negara)",
            description: "Panduan untuk pemohon SKLN (Sengketa Kewenangan Lembaga Negara)",
            href: "/dashboard/bantuan/panduan/pemohon-skln"
        },
        {
            id: 3,
            title: "Panduan Permohonan Pemohon Pilkada",
            description: "Petunjuk untuk permohonan pemohon Pilkada",
            href: "/dashboard/bantuan/panduan/pemohon-pilkada"
        }
    ]

    return (

        <>
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                        Dashboard
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-semibold">Panduan</span>
                </nav>

                <div className="mb-8 sm:mb-10 md:mb-12 text-center px-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-3 sm:mb-4 shadow-lg">
                        <Book className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>

                    <div className="relative inline-block">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative px-2">
                            Panduan Aplikasi
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                        </h1>
                    </div>

                    <p className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
                        Panduan Penggunaan Aplikasi SIMPEL
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        {panduanItems.map((item, index) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`group flex items-center justify-between p-4 sm:p-5 hover:bg-red-50 transition-all duration-200 cursor-pointer ${index !== panduanItems.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                            >
                                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center group-hover:from-red-500 group-hover:to-red-600 transition-all duration-200">
                                            <span className="text-red-600 group-hover:text-white font-bold text-sm sm:text-base md:text-lg transition-colors">
                                                {item.id}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 ml-2 sm:ml-4">
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-200" />
                                </div>
                            </Link>
                        ))}

                        <div className="p-4 sm:p-5">
                            <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src="/img/panduan.jpg"
                                    alt="Panduan Permohonan"
                                    className="w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}