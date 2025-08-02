'use client'
export default function SectionSelector({ sections, selectedSection, selectedSubSection, subSections, setSelectedSection, setSelectedSubSection }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Section
        </label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Sub Section
        </label>
        <select
          value={selectedSubSection}
          onChange={(e) => setSelectedSubSection(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedSection}
          required
        >
          <option value="">Select Sub Section</option>
          {subSections.map((subSection) => (
            <option key={subSection.id} value={subSection.id}>
              {subSection.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
