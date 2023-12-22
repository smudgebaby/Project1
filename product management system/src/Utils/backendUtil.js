export const signInUser = async () => {
  const data = {
    "provider": "email",
    "email": "12345678@c.com",
    "password": "12345678"
  };

  try {
    const response = await fetch('http://127.0.0.1:8080/login/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Error checking user status:', error);
    return null;
  }
};