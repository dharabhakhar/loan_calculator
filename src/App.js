import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loan from './Loan';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loan/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
