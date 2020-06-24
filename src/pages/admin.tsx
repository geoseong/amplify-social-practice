import Amplify, { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const googleStyle = {
  backgroundColor: 'red',
  color: 'white',
}
const fbStyle = {
  backgroundColor: 'blue',
  color: 'white',
}
const buttonStyle = {
  cursor: 'pointer',
  margin: '.3rem',
  padding: '.3rem',
  backgroundColor: 'orange',
  borderRadius: '.2rem',
}
const signoutStyle = {
  backgroundColor: 'black',
  color: 'white',
}
const Admin = () => {
  const [username, setUsername] = useState(null)
  const [logintype, setLogintype] = useState(null)

  useEffect(() => {
    // console.log('in useEffect')
    Auth.currentAuthenticatedUser().then(user => {
      console.log('in useEffect user:', user)
      setUsername(user?.attributes?.email)
      const username = user?.username?.toLowerCase()
      if (username.includes('facebook')) {
        setLogintype('facebook')
      } else if (username.includes('google')) {
        setLogintype('google')
      } else {
        setLogintype('cognito userpool')
      }
    })
  }, [])

  const googleSocialClick = () => {
    // https://www.youtube.com/watch?v=eqDUSY9KHYE&t=319s
    // @ts-ignore
    Auth.federatedSignIn({ provider: 'Google' });
  }
  const fbSocialClick = () => {
    // https://www.youtube.com/watch?v=F6ZPTKiEJx4
    // @ts-ignore
    Auth.federatedSignIn({ provider: 'Facebook' });
  }
  const socialClick = () => {
    Auth.federatedSignIn();
  }
  const checkUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log('user:', user)
  }
  const doSignOut = async () => {
    const user = await Auth.signOut();
    console.log('user:', user)
  }
  return (
    <div>
      <div>{!username ? 'Please login.' : 'Welcome ' + username + '!!!'}</div>
      {logintype && <div>You are signed in via {logintype} !</div>}
      <div style={{...buttonStyle, ...googleStyle}} onClick={googleSocialClick}>Google Social Login</div>
      <div style={{...buttonStyle, ...fbStyle}} onClick={fbSocialClick}>Facebook Social Login</div>
      <div style={buttonStyle} onClick={socialClick}>Go to Hosted UI Login Page</div>
      <div style={buttonStyle} onClick={checkUser}>Check User's Info in devtool console</div>
      <div style={{...buttonStyle, ...signoutStyle}} onClick={doSignOut}>Sign Out</div>
    </div>
  )
}
export default Admin
