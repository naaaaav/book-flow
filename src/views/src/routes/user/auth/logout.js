import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Logout = ({handleLogoutRender}) => {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const onClickHandler = () => {
    if (token === null) {
      history.push("/login")
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: 'POST',
      credentials : 'include',
    }).then(response => {
      if (response.status === 200) {
        localStorage.removeItem('token')
        setToken(null)
        handleLogoutRender()
        // for cart
        localStorage.removeItem('userName')
        alert('로그아웃 성공')
        history.push('/')
      } else if (response.status === 400) {
        localStorage.removeItem('token')
        setToken(null)
        handleLogoutRender()
        alert('로그아웃 성공')
      }
    }).catch(error => {
      console.log(error)
    })
  }
  return <button onClick={onClickHandler}>{token === null ? "로그인" : "로그아웃"}</button>
}

export default Logout;