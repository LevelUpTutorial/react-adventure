import { useState } from 'react'

function Game(props) {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column mb-3 border border-white">
      <div className="p-2 border border-secondary-subtle">
        <p>Navigation Frame</p>
        <p>Welcome: {props.hero}</p>
      </div>
      <div className="p-2 border border-secondary-subtle">
        <p>
          Animation Frame
        </p>
        <button type="button" className="btn btn-primary">Primary</button>
      </div>
      <div className="p-2 border border-secondary-subtle">
        <p>
          Interaction Frame
        </p>
      </div>
    </div>
  )
}

export default Game
