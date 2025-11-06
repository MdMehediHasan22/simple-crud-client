import React from 'react';
const Users = () => {
    const handleAddUser = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email };
        console.log(user);

        //create user in db
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {  
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Data after creating user in db",data);
            alert('User added successfully')
            event.target.reset();
        });
    } 

  return (
    <div>   
        <form onSubmit={handleAddUser}>
            <input type="text" name="name" />
            <br />
            <input type="email" name="email" />
            <br />
            <input type="submit" value="Add User" />

        </form>
    </div>
  );
};
export default Users;