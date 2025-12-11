import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
// Register required AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

import type { ColDef, ICellRendererParams } from 'ag-grid-community';

//import 'ag-grid-community/styles/ag-grid.css'
//import 'ag-grid-community/styles/ag-theme-material.css'

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
}

function App() {

  const [keyword, setKeyword] = useState('');
  const [repodata, setRepodata] = useState<Repository[]>([]);
  
  const columnDefs: ColDef[] = [
    { field: 'id', sortable: true, filter: true },
    { field: 'full_name', sortable: true, filter: true },
    { field: 'html_url', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'full_name',
      cellRenderer: (params: ICellRendererParams) => (
        <button
          onClick={()=>alert(params.value)}>Press me</button>
      )
    }
  ]
  const handleClick = () => {
    axios.get<{ items: Repository[] }>(`https://api.github.com/search/repositories?q=${keyword}`)
      .then(response => setRepodata(response.data.items))
      .catch(err => console.error(err));
  }

  return (
    <>
      <input value={keyword} onChange={e => setKeyword(e.target.value)} />
      <button onClick={handleClick}>Fetch</button>
      <div className="ag-theme-material" style={{ height: 500, width: 850 }}>
        <AgGridReact rowData={repodata} columnDefs={columnDefs}
          pagination={true} paginationPageSize={9} />
      </div>

    </>
  )
}

export default App