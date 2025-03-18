// ClientsContext.js
import React, { createContext, useState, useEffect } from "react";

export const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  // Fetch clients from the backend
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/clients");
      const data = await response.json();
      if (response.ok) {
        setClients(data);
      } else {
        console.error("Error fetching clients:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  // Refresh the clients list
  const refreshClients = () => {
    fetchClients();
  };

  // Fetch clients on initial load
  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, refreshClients }}>
      {children}
    </ClientsContext.Provider>
  );
};