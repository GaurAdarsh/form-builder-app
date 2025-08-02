'use client'
import { useEffect, useState } from 'react'
import SectionSelector from '@/components/SectionSelector'
import QuestionInput from '@/components/QuestionInput'
import OptionTypeSelector from '@/components/OptionTypeSelector'
import OptionsList from '@/components/OptionsList'
import SubmitButton from '@/components/SubmitButton'
import MessageAlert from '@/components/MessageAlert'
import QuestionsList from '@/components/QuestionList'

export default function Home() {
  const [sections, setSections] = useState([])
  const [subSections, setSubSections] = useState([])
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedSubSection, setSelectedSubSection] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [optionType, setOptionType] = useState('single')
  const [options, setOptions] = useState([{ text: '', isCorrect: false }])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [questions, setQuestions] = useState([])


  useEffect(() => {
    const fetchSections = async () => {
      const res = await fetch('/api/sections')
      const data = await res.json()
      setSections(data.sections)
    }
    fetchSections()
  }, [])

  useEffect(() => {
    if (!selectedSection) return setSubSections([])
    const fetchSubSections = async () => {
      const res = await fetch(`/api/sections/${selectedSection}/subsections`)
      const data = await res.json()
      setSubSections(data)
    }
    fetchSubSections()
  }, [selectedSection])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    try {
      console.log("new question",selectedSection, selectedSubSection, questionText, optionType, options)
      const cleanedOptions = options.map(opt => ({
        ...opt,
        marks: Number(opt.marks), // ✅ Ensures `marks` is a number
      }));
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId: Number(selectedSection),
          subSectionId: Number(selectedSubSection),
          questionText,
          optionType,
          options: cleanedOptions,
        }),
      });
  
      const result = await res.json();
  
      if (result.success) {
        setMessage("Question added successfully!");
        setMessageType("success");
        // Optional: Reset form
      } else {
        setMessage(result.error || "Failed to add question.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Something went wrong!");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedSection && selectedSubSection) {
      fetch(`/api/questions?sectionId=${selectedSection}&subSectionId=${selectedSubSection}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setQuestions(data.questions);
          } else {
            console.error(data.error);
          }
        });
    }
  }, [selectedSection, selectedSubSection]);

  const handleDelete = async (id) => {
    await fetch(`/api/questions/${id}`, { method: 'DELETE' })
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }
  

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <main className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">Add Question</h1>
          <form onSubmit={handleSubmit}>
            <SectionSelector
              sections={sections}
              selectedSection={selectedSection}
              selectedSubSection={selectedSubSection}
              subSections={subSections}
              setSelectedSection={setSelectedSection}
              setSelectedSubSection={setSelectedSubSection}
            />
            <QuestionInput questionText={questionText} setQuestionText={setQuestionText} />
            <OptionTypeSelector optionType={optionType} setOptionType={setOptionType} />
            <OptionsList options={options} setOptions={setOptions} />
            <div className="mt-4 flex justify-center">
            <SubmitButton loading={loading} />
            </div>
         
          </form>
              <QuestionsList
            questions={questions}
            onEdit={(q) => {
              // setFormValues(q)
              // setIsEditing(true)
            }}
            onDelete={handleDelete}
          />
          <MessageAlert message={message} type={messageType} />
        </main>
      </div>
    
  )
}