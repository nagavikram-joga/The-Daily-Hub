import {  useReducer } from 'react';
import { useNotesContext } from '../hooks/useNotesContext'
import tokenReducer from '../reducer/tokenReducer';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NoteDetails = ({ note }) => {

  const { dispatch } = useNotesContext()
  const token = JSON.parse(localStorage.getItem("authToken"));
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token)

  const handleClick = async () => {
    if (!token) {
      return
    }

    const response = await fetch('/api/notes/' + note._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_NOTE', payload: json})
    }
  }


    return (
      <div className="note-details">
        <h4>{note.title}</h4>
        <p>{note.content}</p>
        <p id="time">{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default NoteDetails