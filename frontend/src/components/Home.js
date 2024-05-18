import { useEffect, useContext } from 'react';
import { useNotesContext } from "../hooks/useNotesContext"
import TokenContext from '../context/TokenContext';
import tokenReducer from '../reducer/tokenReducer';
// components
import NoteDetails from "./NoteDetails"
import NoteForm from "./NoteForm"

const Home = () => {
  // const token = JSON.parse(localStorage.getItem("authToken"));
  // const [userToken, tokenDispatch] = useReducer(tokenReducer, token)
  const {userToken} = useContext(TokenContext)
  const {notes, dispatch} = useNotesContext()
  

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes', {
        headers: {'Authorization': `Bearer ${userToken}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_NOTES', payload: json})
      }
    }

    if (userToken) {
      fetchNotes()
    }
  }, [userToken])


  return (
    <div className="home">
      <div className="notes">
        {notes && notes.map(note => (
          <NoteDetails note={note} key={note._id} />
        ))}
      </div>
      <NoteForm />
    </div>
  )
}

export default Home