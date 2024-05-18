import { useState } from 'react'
import { useContext } from 'react';
import { useNotesContext } from "../hooks/useNotesContext"
import TokenContext from '../context/TokenContext';
const NoteForm = () => {
    const { dispatch } = useNotesContext()
    const {userToken} = useContext(TokenContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const note = {title, content}
    
    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setContent('')
      setEmptyFields([])
      console.log('new note added:', json)
      dispatch({type: 'CREATE_NOTE', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Note</h3>

      <label>Note Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Content:</label>
      <textarea
        onChange={(e) => setContent(e.target.value)} 
        value={content}
        className={emptyFields.includes('content') ? 'error' : ''}
      />


      <button>Add Note</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NoteForm