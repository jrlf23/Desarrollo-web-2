import {BrowserRouter, Routes, Route} from "react-router"
import {IndexPage} from "./pages/IndexPage"
import {FavoritesPage} from "./pages/FavoritesPage"

const App=()=>
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/favoritos" element={<FavoritesPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App