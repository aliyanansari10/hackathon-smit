import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { Input, InputLabel, Typography } from "@mui/material";
import { GET_STUDENTS } from "../../redux/types";
import { ExcelRenderer } from "react-excel-renderer";
import CircularProgress from "@mui/material/CircularProgress";
import { Table } from "react-bootstrap";
import { async } from "@firebase/util";

const styles = {
  hidden: {
    // display: "none",
  },
  importLabel: {
    color: "black",
    cursor: "pointer",
  },
};
export default function AddStudents() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state?.StudentsReducer?.students);
  // console.log(useSelector((state) => state?.StudentsReducer?.students));
  const inputFile = useRef();
  const [studentsFile, setStudentsFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    const Ref = collection(db, "registeredStudents");
    const students = await getDocs(Ref);
    let studentsArr = [];
    students.forEach((student) => {
      studentsArr.push({ id: student.id, ...student.data() });
    });

    dispatch({
      type: GET_STUDENTS,
      payload: studentsArr,
    });
  };

  const AddDataToDb = async (rows) => {
    console.log("File Upload 11111111111111111111111");
    let TestArrStr = ["code", "email", "name"];
    if (rows[0].join(",") === TestArrStr.join(",")) {
      let payloadArrExcel = [];
      let payloadToPushArr = [];
      let studentsArr = rows.slice(1);
      let promiseArr = [];

      studentsArr.forEach((student) => {
        payloadArrExcel.push({
          code: student[0],
          name: student[1],
          email: student[2],
        });
      });

      payloadArrExcel.forEach((data) => {
        students.forEach((data1) => {
          if (data1?.code.toString() !== data?.code.toString()) {
            payloadToPushArr.push({ ...data });
          }
        });
      });

      try {
        payloadToPushArr.forEach((payload) => {
          promiseArr.push(
            addDoc(collection(db, "registeredStudents"), {
              ...payload,
              code: payload?.code.toString(),
            })
          );
        });

        await Promise.all(promiseArr)
          .then((res) => {
            let arrId = [];

            res.forEach((re) => {
              arrId.push(re?.id);
            });

            let newData = payloadToPushArr.map((payload, i) => ({
              ...payload,
              code: payload?.code.toString(),
              id: arrId[i],
            }));

            dispatch({
              type: GET_STUDENTS,
              payload: [...students, ...newData],
            });
            setLoading(false);
            alert("Students Added");
          })

          .catch((err) => {
            console.log("err", err);
            setLoading(false);
            alert("Something went wrong while adding data");
          });
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        alert("Something went wrong while adding data");
      }
    } else {
      setLoading(false);
      alert("Invalid Structure, heading is important in excel ");
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const ButtonExcelHandler = () => {
    setLoading(true);
    if (studentsFile.length === 0) {
      setLoading(false);
      alert("Please Upload File");
    } else {
      AddDataToDb(studentsFile);
    }
  };

  const selectFileHandler = (e) => {
    let file = e.target.files[0];
    if (
      file?.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      alert("Only Excel Sheets are allowed");
      setLoading(false);
    } else {
      ExcelRenderer(file, (err, resp) => {
        if (err) {
          console.log(err);
          setLoading(false);
          alert("Something went wrong");
        } else {
          // AddDataToDb(resp.rows);
          setStudentsFile(resp.rows);
        }
      });
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Input
            id="import-button"
            // inputProps={{
            //   accept:
            //     ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
            // }}
            ref={inputFile}
            onChange={selectFileHandler}
            style={styles.hidden}
            type="file"
          />
        </div>
        <div>
          <Button
            style={{ margin: 5, border: "1px solid blue" }}
            onClick={ButtonExcelHandler}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={18} />
            ) : (
              "Add Students"
            )}
          </Button>
        </div>
      </div>
      {/* <Typography>{excelFile}</Typography> */}
      {/* {console.log("Students: ", students)} */}
      <div style={{ width: "60rem", margin: "40px auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>CODE</th>
              <th>NAME</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, key) => (
              <tr key={key}>
                <td>{student.code}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
