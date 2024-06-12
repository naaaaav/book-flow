import { useEffect, useState } from 'react';

const AdminUserList = () => {
  const[userList, setUserList] = useState([])
  const[total, setTotal] = useState({"userTotal" : '', "adminTotal" : ''})
  
  useEffect(()=>{
    getUserList();
  }, [])

  const getUserList = () => {
    fetch('http://localhost:8080/api/admin/member',{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access" : localStorage.getItem('access')
      },
    })
      .then(response => {
        return response.json()
      })
      .then(json =>{
        setUserList(json)
      })
      .catch((error)=>{
        console.log(error);
      })

      fetch('http://localhost:8080/api/admin/member/total',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access" : localStorage.getItem('access')
        },
      })
        .then(response => {
          return response.json()
        })
        .then(json => {
          console.log(json);
          console.log("total 재랜더링 테스트 : " + json);
          setTotal({"userTotal" : json.userTotalCount, "adminTotal" : json.adminTotalCount})
        })
  }

  const userRoleChange = (e, user) => {
    if (window.confirm("권한을 변경하시겠습니까?") === false){      
      return false;
    }
    
    fetch(`http://localhost:8080/api/admin/member/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access" : localStorage.getItem('access')
      },
      body: JSON.stringify({
        id : user.id,
        role : e.target.value
      }),
    })
    .then(response => {
      if (response.status === 204) {
        getUserList()
      } else {
        alert("권한 오류")
      }
    })
  }

  const userDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까??") === false){
      return false;
    }

    fetch(`http://localhost:8080/api/admin/member/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access" : localStorage.getItem('access')
      },
    })
    .then(response => {
      if (response.status === 204) {
        getUserList()
      } else {
        alert("삭제 오류")
      }
    })
  }

  return (
    <div>
      <div>
        <div>총회원수 : {total.userTotal}</div>
        <div>관리자수 : {total.adminTotal}</div>
      </div>
      <table>
        <thead className="thead">
          <td>번호</td>
          <td>아이디</td>
          <td>가입유형</td>
          <td>이름</td>
          <td>전화번호</td>
          <td>권한</td>
          <td>관리</td>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role === 'ROLE_ADMIN' ? '관리자' : '일반 회원'}</td>
              <td>{user.name}</td>
              <td>{user.phoneNumber === null ? '전화번호 없음' : user.phoneNumber}</td>
              <td>
                <select onChange={(e) => userRoleChange(e, user)} value={user.role}>
                  <option value={'ROLE_ADMIN'}>관리자</option>
                  <option value={'ROLE_USER'}>일반회원</option>
                </select>
              </td>
              <td>
                <button onClick={(e) => userDelete(user.id)}>회원정보 삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  )
}

export default AdminUserList;