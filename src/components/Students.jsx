import React, { use, useState } from 'react';
   
const Students = ({studentsPromise}) => {
    const initialUsers = use(studentsPromise);
    const [students,setStudents] = useState(initialUsers);
    const handleAddStudent = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const id = event.target.id.value;
        const student = { name, email, id };
        console.log(student);
        //create student in db
        fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {  
                'content-type': 'application/json'  
            },
            body: JSON.stringify(student)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Data after creating student in db",data);
            if(data.insertedId){
                student._id = data.insertedId;
                const newStudents = [...students, student];
                setStudents(newStudents);
                alert('Student added successfully')
                event.target.reset();
            }
        });
    }
    const handleDelStudent = (id) => {
        console.log("Delete student function called",id);
        fetch(`http://localhost:3000/students/${id}`,{  
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                const remainingStudents = students.filter(student => student._id !== id);
                setStudents(remainingStudents);
                alert('Student deleted successfully');
            }
            console.log("Data after deleting student",data);
            
        });
    }

     
    return (
        <div>
            <div>
                <form onSubmit={handleAddStudent}>
                <h2>Students Information</h2>
                <p>This is the Students component where student details will be managed.</p>
                <input type="text" name='name'placeholder='Name' />
                <input type="email" name='email' placeholder='Email'/>
                <input type="number" name='id' placeholder='id'/>
                <input type="submit"value="Add User"  />
                </form>

            </div>
            {/* {View students} */}
            <div>
                <h2>Students List:</h2>
                <ul>
                    {
                        students.map((student) => <li key={student._id}>{student.name} : {student.email} : {student.id}
                        <button onClick={()=>handleDelStudent(student._id)}>Delete</button>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Students;