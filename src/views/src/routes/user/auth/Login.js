import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()


  const LoginProcess = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          const access = response.headers.get('access')
          localStorage.setItem('access', access)
          localStorage.setItem('token', access)
          alert('로그인 성공')
          history.push('/')
          return
        }
        return response.json()
      })
      .then((json)=>{
        //console.log(json);
        if (json.status === 400 || json.status === 401) {
          alert(json.message)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <form>
        <input 
          type='text' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type='text' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={LoginProcess}>로그인</button>
        <Link to="/join">회원가입</Link>
      </form>
    </div>
  )
}

export default Login;