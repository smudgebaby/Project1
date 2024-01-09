export const signInUser = async () => {
  const data = {
    "provider": "email",
    "email": "12345678@c.com",
    "password": "12345678"
  };

  try {
    // const response = await fetch('http://localhost:3000/user/signin', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // });
    // return await response.json();
    // return {res: 'good'};
  } catch (error) {
    console.error('Error checking user status:', error);
    return null;
  }
};