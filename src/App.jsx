import './App.css'
import { stages, initialItems } from './items'

function App() {
  const items = initialItems

  return (
    <div className="app">
      <h1>Content Pipeline Tracker</h1>
      <p className="subtitle">Track content from idea to published.</p>

      <div className="board">
        {stages.map((stage) => {
          const stageItems = items.filter((item) => item.stage === stage)
          return (
            <div className="column" key={stage}>
              <h2>{stage} <span className="count">{stageItems.length}</span></h2>
              <div className="cards">
                {stageItems.map((item) => (
                  <div className="card" key={item.id}>
                    <p className="card-title">{item.title}</p>
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