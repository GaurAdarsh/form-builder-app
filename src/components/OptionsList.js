'use client'

export default function OptionsList({ options, setOptions }) {
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options]
    newOptions[index][field] = value
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, { text: '', marks: '', imageUrl: '' }])
  }

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleImageUpload = async (file, index) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        handleOptionChange(index, 'imageUrl', data.imageUrl)
      } else {
        console.error('Upload failed', data)
        alert('Image upload failed. Please try again.')
      }
    } catch (err) {
      console.error('Error uploading image:', err)
      alert('An error occurred while uploading the image.')
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Options
      </label>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Option</th>
            <th className="border px-3 py-2 text-left">Marks</th>
            <th className="border px-3 py-2 text-left">Image</th>
            <th className="border px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => (
            <tr key={index}>
              <td className="border px-3 py-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(index, 'text', e.target.value)
                  }
                  placeholder={`Type option ${index + 1}`}
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </td>
              <td className="border px-3 py-2">
                <input
                  type="number"
                  value={option.marks}
                  onChange={(e) =>
                    handleOptionChange(index, 'marks', e.target.value)
                  }
                  placeholder={`Marks for option ${index + 1}`}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border px-3 py-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleImageUpload(e.target.files[0], index)
                    }
                  }}
                  className="w-full"
                />
                {option.imageUrl && (
                  <img
                    src={option.imageUrl}
                    alt={`Option ${index + 1}`}
                    className="mt-2 max-h-20 object-contain"
                  />
                )}
              </td>
              <td className="border px-3 py-2 text-center">
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={addOption}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add More Option
      </button>
    </div>
  )
}
