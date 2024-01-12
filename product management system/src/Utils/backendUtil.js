export const signUpUser = async (email, password) => {

  try {
    const response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    return await response.json();
    
  } catch (error) {
    console.error('Error signing up:', error);
  }
};


export const signInUser = async (email, password) => {

  try {
    const response = await fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    
    const data = await response.json();

    if(data.token) {
      // store auth token
      document.cookie = `authToken=${data.token}; path=/; HttpOnly; secure;`;
    }

    return data;
    
  } catch (error) {
    console.error('Error signing in:', error);
  }
};



export const ResetPassword = async (email) => {

  try {
    const response = await fetch('http://localhost:3000/user/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    return await response.json();
    
  } catch (error) {
    console.error('Error reseting password:', error);
  }
};


// retrieve auth token
export const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));

  if (authTokenCookie) {
    return authTokenCookie.split('=')[1];
  }

  return null;
};