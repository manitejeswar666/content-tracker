import { useState } from 'react'
import './App.css'
import { stages, initialItems } from './items'

function App() {
  const [items, setItems] = useState(initialItems)
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('YouTube')
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  function addItem(e) {
    e.preventDefault()
    if (title.trim() === '') return

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      platform,
      stage: 'Idea',
    }
    setItems([...items, newItem])
    setTitle('')
  }

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id))
  }

  function moveItem(id, direction) {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item
        const currentIndex = stages.indexOf(item.stage)
        const newIndex = currentIndex + direction
        if (newIndex < 0 || newIndex >= stages.length) return item
        return { ...item, stage: stages[newIndex] }
      })
    )
  }

  function startEditing(item) {
    setEditingId(item.id)
    setEditingTitle(item.title)
  }

  function saveEdit(id) {
    if (editingTitle.trim() === '') {
      setEditingId(null)
      return
    }
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, title: editingTitle.trim() } : item
      )
    )
    setEditingId(null)
  }

  return (
    <div className="app">
      <h1>Content Pipeline Tracker</h1>
      <p className="subtitle">Track content from idea to published.</p>

      <form className="add-form" onSubmit={addItem}>
        <input
          type="text"
          placeholder="New content idea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option>YouTube</option>
          <option>Instagram</option>
          <option>Other</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="board">
        {stages.map((stage, stageIndex) => {
          const stageItems = items.filter((item) => item.stage === stage)
          return (
            <div className="column" key={stage}>
              <h2>{stage} <span className="count">{stageItems.length}</span></h2>
              <div className="cards">
                {stageItems.map((item) => (
                  <div className="card" key={item.id}>
                    <div className="card-top">
                      {editingId === item.id ? (
                        <input
                          className="edit-input"
                          value={editingTitle}
                          autoFocus
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onBlur={() => saveEdit(item.id)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                        />
                      ) : (
                        <p className="card-title" onClick={() => startEditing(item)}>
                          {item.title}
                        </p>
                      )}
                      <button className="delete-btn" onClick={() => deleteItem(item.id)}>×</button>
                    </div>
                    <span className="platform">{item.platform}</span>
                    <div className="move-row">
                      <button
                        className="move-btn"
                        disabled={stageIndex === 0}
                        onClick={() => moveItem(item.id, -1)}
                      >
                        ← 
                      </button>
                      <button
                        className="move-btn"
                        disabled={stageIndex === stages.length - 1}
                        onClick={() => moveItem(item.id, 1)}
                      >
                        →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App