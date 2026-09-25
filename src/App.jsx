import { useState } from 'react'
import './App.css'
import { stages, initialItems } from './items'

function App() {
  const [items, setItems] = useState(initialItems)
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('YouTube')

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
        {stages.map((stage) => {
          const stageItems = items.filter((item) => item.stage === stage)
          return (
            <div className="column" key={stage}>
              <h2>{stage} <span className="count">{stageItems.length}</span></h2>
              <div className="cards">
                {stageItems.map((item) => (
                  <div className="card" key={item.id}>
                    <div className="card-top">
                      <p className="card-title">{item.title}</p>
                      <button className="delete-btn" onClick={() => deleteItem(item.id)}>×</button>
                    </div>
                    <span className="platform">{item.platform}</span>
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