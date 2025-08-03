import { useState } from 'react'
import { Button } from './components/ui/button'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}...</p>
      <Button
        variant='secondary'
        className='h-[3rem] px-6 py-2 w-full rounded-full text-lg'
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>
    </div>
  )
}

export default App
