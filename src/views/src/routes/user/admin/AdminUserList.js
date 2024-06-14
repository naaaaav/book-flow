import { useEffect, useState } from 'react';

const AdminUserList = () => {
  const[page, setPage] = useState(0)
  const[userList, setUserList] = useState([])
  const[total, setTotal] = useState({"userTotal" : '', "adminTotal" : ''})
  const[paging, setPaging] = useState({
    first : '',
    last : '',
    currentPage : '',
    totalPages : ''
  })
  
  useEffect(()=>{
    getUserList();
  }, [])

  const onChangePage = (page) => {
    console.log("전환 : " + page);
    setPage(page)
    getUserList()
  }

  const getUserList = () => {
    fetch(`http://localhost:8080/api/admin/member?page=${page}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access" : localStorage.getItem('token')
      },
    })
      .then(response => {
        return response.json()
      })
      .then(json =>{
        setUserList(json.userList)
        setPaging({
          first : json.first,
          last : json.last,
          currentPage : json.currentPage,
          totalPages : json.totalPages
        })
      })
      .catch((error)=>{
        console.log(error);
      })
      fetch('http://localhost:8080/api/admin/member/total',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access" : localStorage.getItem('token')
        },
      })
        .then(response => {
          return response.json()
        })
        .then(json => {
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
        "access" : localStorage.getItem('token')
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
        "access" : localStorage.getItem('token')
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
          {userList?.map((user) => (
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
      <div className='paging'>
        {!paging.first && paging.currentPage !== 0 ? 
        <div onClick={(e) => onChangePage(0)}>first</div> 
        : null}
        {!paging.first && paging.currentPage !== 0 ? 
        <div onClick={(e) => onChangePage(paging.currentPage - 1)}>prev</div> 
        : null}
        {
          [...Array(paging.totalPages)].map((item, page)=> {
            if (page == paging.currentPage) {
              return <div key={page} onClick={(e) => onChangePage(page)} style={{color : 'red'}}>
                {page + 1}
              </div>;
            } else if ((paging.currentPage - 2) <= page && page <= (paging.currentPage + 2)) {
              return <div key={page} onClick={(e) => onChangePage(page)}>{page + 1}</div>;
            }
          })
        }
        {!paging.last && paging.currentPage + 1 !== paging.totalPages ?
        <div onClick={(e) => onChangePage(paging.currentPage + 1)}>next</div>
        : null}
        {!paging.last && paging.currentPage + 1 !== paging.totalPages ?
        <div onClick={(e) => onChangePage(paging.totalPages - 1)}>last</div>
        : null}
      </div>
  </div>
  )
}

export default AdminUserList;