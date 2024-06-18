import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  Button,
  Container,
  Center,
  Box,
  Text 
} from '@chakra-ui/react'
import NotLoginHomeHeader from '../../../components/home/NotLoginHomeHeader';
import Footer from '../../../components/home/Footer';
import HomeHeader from '../../../components/home/HomeHeader';

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
    fetch(`${process.env.REACT_APP_API_URL}/api/admin/member?page=${page}`,{
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
      fetch(`${process.env.REACT_APP_API_URL}/api/admin/member/total`,{
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
    fetch(`${process.env.REACT_APP_API_URL}/api/admin/member/${user.id}`, {
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

    fetch(`${process.env.REACT_APP_API_URL}/api/admin/member/${id}`, {
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
      <Container maxW='1500px'>
      <HomeHeader />
      <Center>
        <Box mr={10}>
          <Text textAlign={'center'}>총회원수</Text>
          <Text textAlign={'center'} fontSize = {24}>{total.userTotal}</Text>
        </Box>
        <Box ml={10}>
          <Text textAlign={'center'}>관리자수</Text>
          <Text textAlign={'center'} fontSize = {24}>{total.adminTotal}</Text>
        </Box>
      </Center>
      <TableContainer>
      <Table variant='simple'>
        <Thead className="thead">
          <Tr>
            <Th>번호</Th>
            <Th>아이디</Th>
            <Th>가입유형</Th>
            <Th>이름</Th>
            <Th>전화번호</Th>
            <Th>권한</Th>
            <Th>관리</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userList?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.username}</Td>
              <Td>{user.role === 'ROLE_ADMIN' ? '관리자' : '일반 회원'}</Td>
              <Td>{user.name}</Td>
              <Td>{user.phoneNumber === null ? '전화번호 없음' : user.phoneNumber}</Td>
              <Td>
                <Select onChange={(e) => userRoleChange(e, user)} value={user.role}>
                  <option value={'ROLE_ADMIN'}>관리자</option>
                  <option value={'ROLE_USER'}>일반회원</option>
                </Select>
              </Td>
              <Td>
                <Button
                  colorScheme='red' 
                  onClick={(e) => userDelete(user.id)}>
                    회원정보 삭제
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
      <div>
        {!paging.first && paging.currentPage !== 0 ? 
        <Button onClick={(e) => onChangePage(0)}>first</Button> 
        : null}
        {!paging.first && paging.currentPage !== 0 ? 
        <Button onClick={(e) => onChangePage(paging.currentPage - 1)}>prev</Button> 
        : null}
        {
          [...Array(paging.totalPages)].map((item, page)=> {
            if (page == paging.currentPage) {
              return <Button colorScheme='green' key={page} onClick={(e) => onChangePage(page)} style={{color : 'white'}}>
                {page + 1}
              </Button>;
            } else if ((paging.currentPage - 2) <= page && page <= (paging.currentPage + 2)) {
              return <Button colorScheme='white' key={page} onClick={(e) => onChangePage(page)} style={{color : 'green'}}>{page + 1}</Button>;
            }
          })
        }
        {!paging.last && paging.currentPage + 1 !== paging.totalPages ?
        <Button onClick={(e) => onChangePage(paging.currentPage + 1)}>next</Button>
        : null}
        {!paging.last && paging.currentPage + 1 !== paging.totalPages ?
        <Button onClick={(e) => onChangePage(paging.totalPages - 1)}>last</Button>
        : null}
      </div>
      <Footer />
      </Container>
  </div>
  )
}

export default AdminUserList;