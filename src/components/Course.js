import { useEffect, useState } from "react";
import { insert, read, update, remove } from "../services/apiService";

const Course = props => {
  const [id] = useState(props.match.params.id);
  const [course, setCourse] = useState({
    _id: "0",
    name: "",
    points: 0
  });
  const [inputRequired, setInputRequired] = useState({});

  useEffect(() => {
    if (id !== "0") {
      read("courses", id, data => {
        if (data) setCourse(data);
      });
    }
  }, [id]);

  function changeHandler(event) {
    setCourse({
      ...course,
      [event.target.name]: event.target.value
    });
  }

  const back = () => {
    props.history.push("/courses");
  };

  const save = () => {
    if (course.name && course.points) {
      if (id === "0") {
        insert(
          "courses",
          (({ name, points }) => ({ name, points }))(course),
          data => {
            if (data) return props.history.push("/courses");
            console.log("There was an error during save data");
          }
        );
      } else {
        update("courses", id, course, data => {
          if (data) return props.history.push("/courses");
          console.log("There was an error during save data");
        });
      }
    } else {
      if (!course.name && !course.points) {
        setInputRequired({
          nameError: "Please fill out this field.",
          pointsError: "Please fill out this field."
        })
      } else if (!course.name) {
        setInputRequired({
          nameError: "Please fill out this field.",
          pointsError: ""
        })
      } else {
        setInputRequired({
          nameError: "",
          pointsError: "Please fill out this field."
        })
      }
    }
  };

  const del = () => {
    remove("courses", id, data => {
      props.history.push("/courses");
    });
  };
  
  return (
    <div className="container">
      <h2>Course</h2>
      <form className="input-form">
        <div style={{ margin: "12px 0" }}>
          <label htmlFor="name">Course name: </label>
          <input
            type="text"
            name="name"
            value={course.name}
            onChange={changeHandler}
            style={{ width: "60%" }}
          />
          <span style={{color: "red"}}>{inputRequired.nameError}</span>
        </div>
        <div style={{ margin: "12px 0" }}>
          <label htmlFor="points">Course points: </label>
          <input
            type="text"
            name="points"
            value={course.points}
            onChange={changeHandler}
            style={{ width: "60%" }}
          />
           <span style={{color: "red"}}>{inputRequired.pointsError}</span>
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

export default Course;