'use client'

import { ChevronRight, ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqData = [
        {
            id: 1,
            pertanyaan: 'Apa itu SIMPEL?',
            jawaban: 'SIMPEL adalah aplikasi untuk mengajukan permohonan elektronik secara online (Permohonan Online) dan memberikan akses langsung kepada pada pihak terhadap perkara konstitusi yang berbasis web.'
        },
        {
            id: 2,
            pertanyaan: 'Bagaimana mendapatkan akses menggunakan aplikasi SIMPEL?',
            jawaban: 'User dapat melakukan registrasi dengan menggunakan alamat email pada menu Pendaftaran Login Baru, dan selanjutnya melakukan aktivasi pada email yang dikirimkan oleh system.'
        },
        {
            id: 3,
            pertanyaan: 'Manfaat apa saja yang diberikan pada aplikasi SIMPEL?',
            jawaban: `
            <ol class="list-decimal ml-5">
            <li>Mendaftarkan diri dalam mengajukan permohonan secara online</li>
            <li>Tracking perkara terhadap Pemohon, Termohon dan Pihak Terkait</li>
            <li>Mengunduh risalah/putusan</li>
            </ol>
            `
        },
        {
            id: 4,
            pertanyaan: 'Dokumen apa sajakah yang harus disiapkan dalam mengajukan permohonan online?',
            jawaban: `
            <ol class="list-decimal ml-5">
            <li>KTP Pemohon (dalam format .jpg)</li>
            <li>Email Pemohon</li>
            <li>KTP Kuasa Pemohon (dalam format .jpg)</li>
            <li>Email Kuasa Pemohon</li>
            <li>Surat Kuasa (dalam format .pdf)</li>
            <li>Permohonan (dalam format .pdf)</li>
            <li>Daftar Bukti (dalam format .doc)</li>
            <li>Surat Ketetapan KPU (dalam format .pdf)</li>
            </ol>
            `
        },
        {
            id: 5,
            pertanyaan: 'Regulasi apa saja yang mengatur tentang SIMPEL?',
            jawaban: `
            <ol class="list-decimal ml-5">
            <li>Peraturan Mahkamah Konstitusi Nomor 18 Tahun 2009 (PMK 18/2009) Tentang Pedoman Pengajuan Permohonan Elektronik (Electronic Filing) dan Pemeriksaan Persidangan Jarak jauh (Video Conference)</li>
            <li>Peraturan Mahkamah Konstitusi Nomor 5 Tahun 2017 Tentang Pedoman Beracara dalam Perselisihan Hasil Pemilihan Gubernur, Bupati dan Walikota</li>
            <li>Peraturan Mahkamah Konstitusi Nomor 6 Tahun 2017 Tentang Pedoman Beracara dalam Perselisihan Hasil Pemilihan Gubernur, Bupati dan Walikota dengan Satu Pasangan Calon</li>
            <li>Peraturan Mahkamah Konstitusi Nomor 7 Tahun 2017 Tentang Tahapan, Kegiatan, dan Jadwal Penanganan Perkara Perselisihan Hasil Pemilihan Gubernur, Bupati dan Walikota</li>
            <li>Peraturan Mahkamah Konstitusi Nomor 8 Tahun 2017 Tentang Pedoman Penyusunan Permohonan Pemohon, Jawaban Termohon, dan Keterangan Pihak Terkait dalam Perkara Perselisihan Hasil Pemilihan Gubernur, Bupati dan Walikota</li>
            </ol>
            `
        },
        {
            id: 6,
            pertanyaan: 'Fitur apa saja yang ada pada aplikasi SIMPEL?',
            jawaban: `
            <ol class="list-decimal ml-5">
            <li>Permohonan Pemohon Online</li>
            <li>Keterangan Pihak Terkait</li>
            <li>Jawaban Termohon</li>
            <li>Keterangan Bawaslu</li>
            <li>Tracking perkara terhadap Pemohon, Termohon, Pihak Terkait dan Bawaslu</li>
            </ol>
            `
        },
        {
            id: 7,
            pertanyaan: 'Bagaimana jika user lupa username dan password aplikasi SIMPEL?',
            jawaban: 'User dapat melakukan reset password melalui menu Lupa Password, selanjutnya input alamat email yang sesuai dengan alamat email pendaftaran, kemudian cek password yang sudah direset pada email.'
        },
        {
            id: 8,
            pertanyaan: 'Output apa yang dihasilkan dari mengajukan permohonan online?',
            jawaban: 'Outputnya adalah Tanda Terima Permohonan Online dengan QR Code.'
        },
        {
            id: 9,
            pertanyaan: 'Apa yang selanjutnya harus dilakukan setelah mengajukan permohonan online?',
            jawaban: 'Pemohon selanjutnya dapat melakukan verifikasi ke gedung MK dengan membawa tanda terima permohonan online dan berkas permohonan asli.'
        }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
      `}</style>

            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                        Dashboard
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-semibold">FAQ</span>
                </nav>

                <div className="mb-8 sm:mb-10 md:mb-12 text-center px-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-3 sm:mb-4 shadow-lg">
                        <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>

                    <div className="relative inline-block">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-2 relative px-2">
                            Frequently Asked Questions
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                        </h1>
                    </div>

                    <p className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
                        Temukan jawaban untuk pertanyaan yang sering diajukan seputar sistem permohonan online kami
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                            }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                                    <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                                            <span className="text-red-600 font-bold text-xs sm:text-sm md:text-base">
                                                {faq.id}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors flex-1 pr-1 sm:pr-2 leading-snug">
                                        {faq.pertanyaan}
                                    </h3>
                                </div>
                                <div className="flex-shrink-0 ml-2">
                                    <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
                                    </div>
                                </div>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 pt-2">
                                    <div className="pl-0 sm:pl-11 md:pl-14 pr-0 sm:pr-8 md:pr-10">
                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 sm:p-4 border-l-4 border-red-500">
                                            <div
                                                className="text-sm sm:text-base text-gray-700 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: faq.jawaban }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center shadow-xl">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 px-2">
                        Masih Ada Pertanyaan?
                    </h3>
                    <p className="text-red-50 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto px-4 leading-relaxed">
                        Jika pertanyaan Anda belum terjawab, jangan ragu untuk menghubungi tim support kami
                    </p>
                    <a
                        href="/dashboard/bantuan/hubungi"
                        className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-red-600 font-semibold text-sm sm:text-base rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Hubungi Support
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" />
                    </a>
                </div> */}
            </div>

        </>
    )
}