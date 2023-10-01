import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Route, Routes, Navlink, NavLink } from "react-router-dom";
import { HomeView } from "./Views/HomeView";
import { AuthRoute } from "./Auth/AuthRoute";

import { MyPetsView } from "./Views/MyPetsView";
import { LoginView } from "./Views/LoginView";
import { PetView } from "./Views/PetView";
import { ProfileView } from "./Views/ProfileView";
import { SearchView } from "./Views/SearchView";
import { DashboardView } from "./Views/AdminViews/DashboardView";
import { AdminRoute } from "./Auth/AdminRoute";
import { AddPetView } from "./Views/AdminViews/AddPetView";
import { RegisterView } from "./Views/RegisterView";

function App() {
  //Goals: implement permissions; additional layer of route protection
  //overall goals- make functions more uniform for example error displaying; extract to helpers; as well as navigating decide whether named functions or anon onclick
  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomeView />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route
          path="/my-pets"
          element={
            <AuthRoute>
              <MyPetsView />
            </AuthRoute>
          }
        />
        <Route path="/pets" element={<PetView />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <ProfileView />
            </AuthRoute>
          }
        />
        <Route path="/search" element={<SearchView />} />
        <Route
          path="/addpet"
          element={
            <AdminRoute>
              <AddPetView />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <DashboardView />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
