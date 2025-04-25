import React, { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'

interface PaymentModalProps {
  amount: number
  onClose: () => void
  onSuccess: () => void
}

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onClose, onSuccess }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = async () => {
    setLoading(true)
    try {
      // In a real app, you would call your backend to initialize Paystack payment
      // const response = await fetch('/api/payments/initialize', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, amount })
      // })
      // const data = await response.json()
      // window.location.href = data.data.authorization_url

      // Simulate successful payment for demo
      setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)
    } catch (err) {
      setError('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">Your room has been booked successfully.</p>
            <button
              onClick={() => {
                onSuccess()
                onClose()
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount to pay:</span>
                <span className="font-semibold">${amount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

            <button
              onClick={handlePayment}
              disabled={loading || !email}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {loading ? 'Processing...' : 'Pay with Paystack'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
