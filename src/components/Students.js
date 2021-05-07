import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list } from "../services/apiService";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    list("students", data => {
      setStudents(data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Year of birth</th>
            <th>Address</th>
            <td>
              <Link to="/students/0">Add new</Link>
            </td>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.yearOfBirth}</td>
              <td>{student.address}</td>
              <td>
                <Link to={`/students/${student._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;