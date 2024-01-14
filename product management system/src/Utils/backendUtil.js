export const signUpUser = async (email, password) => {

  try {
    const response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    return response.ok;
    
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

    return response.ok;
    
  } catch (error) {
    console.error('Error reseting password:', error);
  }
};


// retrieve auth token
// export const verifyAuthToken = () => {
//   const cookies = document.cookie.split(';');
//   const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
//
//   if (authTokenCookie) {
//     const authToken = authTokenCookie.split('=')[1];
//     try {
//       const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
//       console.log(decoded);
//     } catch(err) {
//       console.error('Invalid or expired token:', err.message);
//     }
//   }
// };