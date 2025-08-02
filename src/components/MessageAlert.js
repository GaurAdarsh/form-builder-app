export default function MessageAlert({ message, type }) {
    if (!message) return null
  
    const color = type === 'success' ? 'green' : 'red'
  
    return (
      <div className={`my-4 px-4 py-2 bg-${color}-100 text-${color}-700 border border-${color}-300 rounded-md`}>
        {message}
      </div>
    )
  }