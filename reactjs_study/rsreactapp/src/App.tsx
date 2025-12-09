import { useState } from 'react'
import axios from 'axios'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { ColDef } from 'ag-grid-community';

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
}

function App() {

  const [keyword, setKeyword] = useState('');
  const [repodata, setRepodata] = useState<Repository[]>([]);

  const [columnDefs] = useState < ColDef[] > (
    [
      { field: 'id' },
      { field: 'full_name' },
      { field: 'html_url' }
    ]);

  const handleClick = () => {
    axios.get<{ items: Repository[] }>(`https://api.github.com/search/repositories?q=${keyword}`)
      .then(response => setRepodata(response.data.items))
      .catch(err => console.error(err));
  }

  return (
    <>
      <input value={keyword} onChange={e => setKeyword(e.target.value)} />
      <button onClick={handleClick}>Fetch</button>
      <div className='ag-theme-material' style={{ height: 500, width: 850 }}>
        <AgGridReact rowData={repodata} columnDefs={columnDefs}/>
      </div>

    </>
  )
}

export default App
