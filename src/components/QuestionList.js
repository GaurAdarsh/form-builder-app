'use client'

import { useState } from 'react'
import QuestionCard from './QuestionCard'

const QUESTIONS_PER_PAGE = 5

export default function QuestionsList({ questions, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)

  const paginatedQuestions = questions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  )

  if (!questions.length) return <p>No questions found.</p>

  return (
    <div className="space-y-4 mt-6">
      {paginatedQuestions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          onEdit={() => onEdit(q)}
          onDelete={() => onDelete(q.id)}
        />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
