import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Join = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username : '',
    password : '',
    name : '',
    phoneNumber : ''
  })

  const onChangeForm = (e) => {
    setFormData(prev => ({...formData, [e.target.name] : e.target.value}))
  }

  const joinProccess = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    fetch("http://localhost:8080/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
          // 장바구니생성
          const userName = formData.username;
          localStorage.setItem('userName',userName);
          localStorage.setItem(`cart-${userName}`, JSON.stringify([]));

          alert('회원가입 성공')
          history.push('/login')
          return
        }
        return response.json();
      })
      .then((json)=>{
        if (json.status === 400) {
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
        <div>
          <label>아이디 : </label>
          <input
            name='username'
            type={"text"}
            value={formData.username}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            name='password'
            type={"password"}
            value={formData.password}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <label>이름 : </label>
          <input
            name='name'
            type={"text"}
            value={formData.name}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <label>전화번호 : </label>
          <input
            name='phoneNumber'
            type={"number"}
            value={formData.phoneNumber}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <button onClick={joinProccess}>회원가입</button>
        </div>
      </form>
    </div>
  )
}

export default Join;