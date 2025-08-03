import { Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<div>Home</div>} />
      <Route path='/welcome' element={<div>Welcome</div>} />
    </Routes>
  )
}
