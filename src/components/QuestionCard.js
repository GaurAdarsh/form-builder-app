import Image from 'next/image'
import ImageModal from './ImageModal'

export default function QuestionCard({ question, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{question.questionText}</h3>
        <div className="space-x-2">
          <button onClick={onDelete} className="text-red-500">Delete</button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-1 capitalize">Type: {question.optionType}</p>

      <ul className="mt-3 space-y-2">
        {question.options.map((opt, idx) => (
          <li key={opt.id} className="flex items-center gap-2">
            <span className="font-medium">{idx + 1}.</span>
            <span>{opt.text}</span>
            <span className="text-xs text-gray-500 ml-2">({opt.marks} marks)</span>
                {opt.imageUrl && <ImageModal imageUrl={opt.imageUrl} />}
            
           
          </li>
        ))}
      </ul>
    </div>
  )
}
