export const signUpUser = async (email, password) => {

  try {
    const response = await fetch('http://localhost:3000/api/signup', {
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
    const response = await fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    // store auth token
    const data = await response.json();
    document.cookie = `authToken=${data.token}; path=/; secure;`;

    
  } catch (error) {
    console.error('Error signing in:', error);
  }
};



export const ResetPassword = async (email) => {

  try {
    const response = await fetch('http://localhost:3000/api/resetpassword', {
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