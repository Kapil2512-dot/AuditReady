const API_URL = "http://localhost:8000/api/login";

// Register user
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    const data = await response.json();

    // Save the token to localStorage or sessionStorage
    if (data.token) {
      localStorage.setItem('token', data.token); // Store the token
    }

    return data; // Return the response data (user and token)
  } catch (error) {
    throw error.message;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    console.log("Sending login request...");
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData); // Log the error
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    console.log("Login response:", data); // Log the response

    if (data.token) {
      localStorage.setItem("token", data.token); // Store the token
      console.log("Token stored in localStorage");
    }

    return data; // Return the response data
  } catch (error) {
    console.error("Error in loginUser:", error); // Log the error
    throw error;
  }
};