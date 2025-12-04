'use client'

import { useEffect } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'

interface AlertProps {
  type: 'success' | 'error'
  message: string
  onClose: () => void
}

export default function Alert({ type, message, onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slideInRight">
      <div className={`min-w-[280px] max-w-[90vw] sm:max-w-md rounded-xl shadow-2xl border-2 p-4 flex items-start gap-3 ${
        type === 'success' 
          ? 'bg-green-50 border-green-500' 
          : 'bg-red-50 border-red-500'
      }`}>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-white" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold mb-1 ${
            type === 'success' ? 'text-green-900' : 'text-red-900'
          }`}>
            {type === 'success' ? 'Berhasil!' : 'Gagal!'}
          </p>
          <p className={`text-sm ${
            type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${
            type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}