'use client'
export default function OptionTypeSelector({ optionType, setOptionType }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Option Type
      </label>
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="single"
            checked={optionType === 'single'}
            onChange={(e) => setOptionType(e.target.value)}
            className="form-radio"
          />
          <span className="ml-2">Single</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="multi"
            checked={optionType === 'multi'}
            onChange={(e) => setOptionType(e.target.value)}
            className="form-radio"
          />
          <span className="ml-2">Multi</span>
        </label>
      </div>
    </div>
  )
}