'use client'
export default function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  )
}