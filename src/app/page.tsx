
import Login from './login'

// THIS IS THE localhost:3000
//When clicking login it goes to http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F
//This is something I do not fully understand and I am currious if we can just start here???

export default function Home() {
  return (
    <div style={{width: "500px", margin: "0 auto", paddingTop: "30px"}}>
      <h3>Login Page. Trying to learn google OAUTH</h3>
      <Login />
    </div>
  )
}