import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/addcreator" element={<AddCreator />} />
        <Route path="/creators/:creatorId" element={<ViewCreator />} />
        <Route path="/creators/:creatorId/edit" element={<EditCreator />} />
      </Route>
    </Routes>
  )
}

export default App
