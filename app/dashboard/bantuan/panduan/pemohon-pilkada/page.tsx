'use client'

import { ChevronRight, FileText, Upload, CheckCircle, Send, Clock, AlertCircle, FileCheck, Edit, Download, UserCheck, Settings, Mail, Calendar, Paperclip, Shield, Eye, Save, Zap, Bell, Archive, Check } from 'lucide-react'
import Link from 'next/link'

export default function PanduanPage() {
   const steps = [
        {
            icon: FileText,
            title: "Login",
            image: "https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800&auto=format&fit=crop",
            instructions: [
                "Isi email dan password yang digunakan untuk login",
                "Klik Login"
            ]
        },
        {
            icon: Upload,
            title: "Dashboard",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
            instructions: [
                "Klik menu Pengujian Undang-Undang (PUU)"
            ]
        },
        {
            icon: Edit,
            title: "Informasi Permohonan",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop",
            instructions: [
                "Klik tombol Permohonan Baru atau menu Permohonan PUU"
            ]
        },
        {
            icon: Paperclip,
            title: "Proses Pengisian Pokok Permohonan",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
            instructions: [
                "Isi Pokok Permohonan",
                "Klik Simpan"
            ]
        },
        {
            icon: FileCheck,
            title: "Proses Pengisian Pokok Permohonan",
            image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Lanjutkan"
            ]
        },
        {
            icon: Shield,
            title: "Proses Pengisian Pokok Permohonan",
            image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop",
            instructions: [
                "Klik OK"
            ]
        },
        {
            icon: Calendar,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Tambah Pemohon"
            ]
        },
        {
            icon: Eye,
            title: "Proses Pengisian Pokok Permohonan",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop",
            instructions: [
                "Isi data pemohon, gunakan alamat email dan nomor handphone yang aktif untuk keperluan komunikasi dan panggilan sidang",
                "Klik Simpan"
            ]
        },
        {
            icon: CheckCircle,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Tambah Kuasa, jika menggunakan kuasa"
            ]
        },
        {
            icon: Save,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Kuasa Hukum (Advokat) jika kuasa yang digunakan bukan Advokat",
                "Isi dan lengkapi data kuasa, gunakan alamat email dan nomor handphone yang aktif untuk keperluan komunikasi dan panggilan sidang",
                "Klik Simpan"
            ]
        },
        {
            icon: Send,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Tambah Pemohon jika Pemohon lebih dari satu dan lakukan langkah yang sama seperti langkah 9 - 11",
                "Klik Tambah Kuasa jika Kuasa lebih dari satu dan lakukan langkah yang sama seperti langkah 12 - 15"
            ]
        },
        {
            icon: Mail,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Browse dan pilih file permohonan dengan format yang sesuai, dalam hal ini file permohonan dengan format PDF"
            ]
        },
        {
            icon: Clock,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Browse dan pilih file permohonan dengan format yang sesuai, dalam hal ini file permohonan dengan format DOC/DOCX"
            ]
        },
        {
            icon: Bell,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800&auto=format&fit=crop",
            instructions: [
                "Error ini terjadi apabila file yang dipilih tidak sesuai dengan yang diminta, dalam hal ini file yang di upload dalam format PDF tetapi yang diminta dalam format DOC/DOCX"
            ]
        },
        {
            icon: UserCheck,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Tambah Berkas jika ada file tambahan yang perlu di upload"
            ]
        },
        {
            icon: AlertCircle,
            title: "Proses Pengisian Data Permohonan",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
            instructions: [
                "Isi nama berkas dan pilih file yang akan di upload",
                "Klik Simpan"
            ]
        },
        {
            icon: Download,
            title: "Proses Kirim Permohonan",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Kirim Permohonan"
            ]
        },
        {
            icon: Settings,
            title: "Proses Kirim Permohonan",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
            instructions: [
                "Klik Ya Kirim!"
            ]
        },
        {
            icon: Zap,
            title: "Proses Kirim Permohonan",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
            instructions: [
                "Klik OK"
            ]
        },
        {
            icon: Archive,
            title: "Proses Kirim Permohonan",
            image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&auto=format&fit=crop",
            instructions: [
                "Klik TTPPO untuk melihat Tanda Terima Pangajuan Permohonan Online"
            ]
        },
        {
            icon: FileCheck,
            title: "Tanda Terima Pengajuan Permohonan Online",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
            instructions: [
                // "Tim legal melakukan review final",
                // "Pengecekan terakhir kelengkapan",
                // "Persetujuan dari pihak berwenang"
            ]
        },
        {
            icon: CheckCircle,
            title: "Informasi Permohonan",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop",
            instructions: [
                // "Terima notifikasi penyelesaian",
                // "Download dokumen hasil permohonan",
                // "Simpan sebagai arsip pribadi"
            ]
        }
    ]
    return (
        <>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
                <nav className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm mb-4 sm:mb-6 overflow-x-auto">
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium whitespace-nowrap">
                        Dashboard
                    </Link>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <Link href="/dashboard/bantuan/panduan" className="text-gray-600 hover:text-gray-900 transition-colors font-medium whitespace-nowrap">
                        Panduan
                    </Link>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900 font-semibold whitespace-nowrap">Pemohon PILKADA</span>
                </nav>

                <div className="mb-6 sm:mb-8 md:mb-10 text-center px-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-2 sm:mb-3 shadow-lg">
                        <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                    </div>

                    <div className="relative inline-block">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-red-600 mb-2 relative px-2">
                            Panduan Lengkap Permohonan PILKADA
                            <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                        </h1>
                    </div>

                    <p className="mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
                        Ikuti langkah-langkah berikut untuk mengajukan permohonan sebagai pemohon Pemilihan Kepala Daerah (PILKADA)
                    </p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Langkah Persiapan</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Pengujian Undang-Undang dapat dilakukan oleh siapa saja yang hak konstitusionalnya dirugikan dengan adanya Undang-Undang yang telah dibuat. Untuk mengajukan permohonan secara online dibutuhkan data dan dokumen yang lengkap agar proses pengajuan permohonan bisa berjalan dengan lancar. Berikut ini adalah beberapa dokumen yang perlu dipersiapkan untuk pengajuan permohonan Pengujian Undang-Undang secara online:
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Dokumen yang Harus Disiapkan:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em> <strong>KTP Pemohon</strong> (dalam format <strong>JPG, JPEG, PNG atau PDF</strong>)</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>KTP Kuasa</strong> (dalam format <strong>JPG, JPEG, PNG atau PDF</strong>)</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>KTA/BAS</strong> (khusus Advokat, dalam format <strong>JPG, JPEG, PNG atau PDF</strong>)</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><strong>Email</strong> Pemohon dan Kuasa yang aktif</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><strong>Nomor Handphone</strong> Pemohon dan Kuasa yang aktif</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>Surat Kuasa</strong> (dalam format <strong>JPG, JPEG, PNG atau PDF</strong>)</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>Permohonan</strong> dalam format dokumen Microsoft Word <strong>(DOC/DOCX)</strong></span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>Permohonan</strong> dalam format dokumen <strong>PDF</strong></span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>Daftar Alat Bukti</strong> dalam format dokumen Microsoft Word <strong>(DOC/DOCX)</strong></span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>Daftar Alat Bukti</strong> dalam format dokumen <strong>PDF</strong></span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700"><em>Soft copy </em><strong>Alat/Dokumen Bukti</strong> dalam format dokumen <strong>PDF</strong></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed ml-2 sm:ml-4">
                            Semua file soft copy yang akan diupload mempunyai ukuran <strong>maksimal 50 MB </strong>untuk memudahkan dan mempercepat proses upload. Jika semua dokumen telah disiapkan maka selanjutnya dapat langsung login, jika belum mempunyai akun untuk login, dapat mendaftar terlebih dahulu. Pastikan koneksi internet anda lancar.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon
                        const isLastStep = index === steps.length - 1
                        
                        return (
                            <div 
                                key={index} 
                                className="relative flex gap-3 sm:gap-4 md:gap-6 pb-6 sm:pb-8 last:pb-0"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg z-10">
                                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    {!isLastStep && (
                                        <div className="relative w-0.5 h-full mt-2 bg-gray-300 overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-500 to-red-600"></div>
                                        </div>
                                    )}
                                </div>

                               <div className="flex-1 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
                                    <div className="p-3 sm:p-4 md:p-5">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2">
                                            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{step.title}</h4>
                                            {/* <span className="text-xs font-medium text-red-600 bg-red-50 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                                                Langkah {index + 1}
                                            </span> */}
                                        </div>
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                                        />
                                        {step.instructions?.length > 0 && (
                                            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">

                                                <h5 className="text-xs sm:text-sm font-bold text-red-700 mb-2">Langkah-langkah:</h5>

                                                <div className="space-y-2 sm:space-y-2.5">
                                                    {step.instructions.map((instruction, idx) => {

                                                        const prevStepsInstructionCount = steps
                                                            .slice(0, index)
                                                            .reduce((total, s) => total + (s.instructions?.length || 0), 0);

                                                        const globalNumber = prevStepsInstructionCount + idx + 1;

                                                        return (
                                                            <div key={idx} className="flex items-start space-x-2 sm:space-x-3">
                                                                <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                                                    {globalNumber}
                                                                </span>
                                                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1 pt-0.5">
                                                                    {instruction}
                                                                </p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                    <div className="flex justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl bg-gradient-to-br from-green-500 to-green-600">
                            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                    </div>
                    
                    <div className="text-center mt-4 sm:mt-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Proses Selesai!</h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 px-4">
                            Permohonan Anda telah berhasil diproses dan selesai
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}