import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Logout = () => {
  const history = useHistory();
  const [access, setAccess] = useState(localStorage.getItem('access'));
  const onClickHandler = () => {
    if (access === null) {
      history.push("/login")
      return;
    }

    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials : 'include',
    }).then(response => {
      if (response.status === 200) {
        localStorage.removeItem('access')
        setAccess(null)
        alert('로그아웃 성공')
      } else if (response.status === 400) {
        alert('로그아웃 실패')
      }
    }).catch(error => {
      console.log(error)
    })
  }
  return <button onClick={onClickHandler}>{access === null ? "로그인" : "로그아웃"}</button>
}

export default Logout;