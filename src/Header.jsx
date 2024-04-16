import { Route, Routes } from 'react-router-dom';

export default function Header({ searchValue, setSearchValue }) {
    return(
        <>
            <div className="header">
                <h1>Saraplex</h1>
                <input 
                placeholder=" Search"
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                />
            </div>
        </>
    )
}