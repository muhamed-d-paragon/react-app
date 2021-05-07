import { useEffect, useState } from "react";
import { insert, read, remove, update } from "../services/apiService";

const Student = props => {
  const [id] = useState(props.match.params.id);

  const [student, setStudent] = useState({
    _id: "0",
    firstName: "",
    lastName: "",
    yearOfBirth: "",
    address: ""
  });
  const [inputRequired, setInputRequired] = useState({});

  useEffect(() => {
    if (id !== "0") {
      read("students", id, data => {
        if (data) setStudent(data);
      });
    }
  }, [id]);

  function changeHandler(event) {
    setStudent({
      ...student,
      [event.target.name]: event.target.value
    });
  }

  const del = () => {
    remove("students", id, data => {
      props.history.push("/students");
    });
  };

  const back = () => {
    props.history.push("/students");
  };

  const save = () => {
    if (student.firstName && student.lastName) {
      if (id === "0") {
        student._id = undefined;
        insert("students", student, data => {
          if (data) return props.history.push("/students");
          console.log("There was an error during save data!");
        });
      } else {
        update("students", id, student, data => {
          if (data) return props.history.push("/students");
          console.log("There was an error during save data!");
        });
      }
    } else {
      if (!student.firstName && !student.lastName) {
        setInputRequired({
          firstNameError: "Please fill out this field.",
          lastNameError: "Please fill out this field."
        });
      } else if (!student.firstName) {
        setInputRequired({
          firstNameError: "Please fill out this field.",
          lastNameError: ""
        });
      } else {
        setInputRequired({
          firstNameError: "",
          lastNameError: "Please fill out this field."
        });
      }
    }
  };

  return (
    <div className="container">
      <h2>Student</h2>
      <form className="input-form">
        <div style={{ margin: "12px 0" }}>
          <label htmlFor="firstName">First name: </label>
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={changeHandler}
            style={{ width: "60%" }}
          />
          <span style={{ color: "red" }}>{inputRequired.firstNameError}</span>
        </div>
        <div style={{ margin: "12px 0" }}>
          <label htmlFor="lastName">Last name: </label>
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={changeHandler}
            style={{ width: "60%" }}
          />
          <span style={{ color: "red" }}>{inputRequired.lastNameError}</span>
        </div>
        <div style={{ margin: "12px 0" }}>
          <label htmlFor="yearOfBirth">Year of Birth: </label>
          <input
            type="text"
            name="yearOfBirth"
            value={student.yearOfBirth || ""}
            onChange={changeHandler}
            style={{ width: "60%" }}
          />
        </div>
        <div style={{ margin: "12px 0" }}>
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            value={student.address || ""}
            onChange={changeHandler}
            style={{ width: "60%" }}
          />
        </div>
        <hr />
        {id !== "0" && (
          <div className="left">
            <button type="button" onClick={del}>
              DELETE
            </button>
          </div>
        )}
        <div className="right">
          <button type="button" onClick={back}>
            BACK
          </button>
          &nbsp;&nbsp;
          <button type="button" onClick={save}>
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Student;