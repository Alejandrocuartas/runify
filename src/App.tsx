import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import RunnerDashboard from "./pages/RunnerDashboard";
import AddRace from "./pages/AddRace";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/organizer-dashboard" element={<OrganizerDashboard/>} />
                    <Route path="/runner-dashboard" element={<RunnerDashboard/>} />
                    <Route path="/events" element={<Events/>} />
                    <Route path="/add-race" element={<AddRace/>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;