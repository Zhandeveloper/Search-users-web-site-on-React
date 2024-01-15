import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';


// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users,setUsers]=React.useState([])
  const [isLoading,setLoading]=React.useState(true)
  const [searchValue,setSearchValue]=React.useState('')
  const [invites,setInvites]=React.useState([])
  const [success, setSuccess] = React.useState(false); // Исправлено

  React.useEffect(()=>{
    fetch('https://reqres.in/api/users').then(res=>res.json()).then(json=>{
      setUsers(json.data)
    }).catch(err=>{
      console.warn(err)
      alert("Ошибка при получении пользователей")
    }).finally(()=>setLoading(false))
  },[])
  const onChageSearchValue=(event)=>{
    setSearchValue(event.target.value)
  }

  const onClickInvite=(id)=>{
    if (invites.includes(id)){
      setInvites(prev=>prev.filter(id=> id !=id))
    } else{
      setInvites(prev=>[...prev,id])
    }
  }

  const onClickSendInvites=()=>{
    setSuccess(true)
  }
  return (
    <div className="App">
      {success ? (
        <Success  count={invites.length}            ></Success>
      ) : (
        <Users
          onChangeSearchValue={onChageSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
