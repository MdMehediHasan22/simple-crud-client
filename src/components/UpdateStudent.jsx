import React from 'react';
import { useLoaderData } from 'react-router';
const UpdateStudent = () => {
    const student = useLoaderData();
    const handleUpdateStudent = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const id = event.target.id.value;
        const updatedStudent = { name, email, id };
        console.log("Updated Student:", updatedStudent);
        // Here you can add the fetch call to update the student in the backend
        fetch(`http://localhost:3000/students/${student._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedStudent)
        })
        .then(res => res.json())
        .then(data =>{
            console.log("Data after updating student in db",data);
            if(data.modifiedCount > 0){
                alert('Student updated successfully');
            }
        })
    };
    return (
        <div>
            <h2>Update Student: {student.name}</h2>
            <form onSubmit={handleUpdateStudent}>
                <input type="text" name="name" defaultValue={student.name} /><br/>
                <input type="email" name="email" defaultValue={student.email} /><br/>
                <input type="number" name="id" defaultValue={student.id} /><br/>
                <input type="submit" value="Update Student" />
            </form>
        </div>
    );
};
export default UpdateStudent;