import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Landing from "./Screens/Landing";
import JoinMembershipForm from "./Screens/JoinMembershipForm";
import Membership from "./Screens/Membership";



const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="join-membership" element={<JoinMembershipForm />} />
        <Route path="/membership/:userEmail" element={<Membership />} />
      </Routes>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
