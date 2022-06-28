import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse"
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px"
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px"
    },
    inputs: {
      marginBottom: "5px",
      display: "block"
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
      color: "#fff"
    }
  }
};

const PhoneBookForm = (props) => {
  // State
  const initState = {
    id: null,
    userFirstname: "Coder",
    userLastname: "byte",
    userPhone: "0000"
  };
  const [userData, setUserData] = useState(initState);

  // Change Handler
  const userChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !userData.userFirstname ||
      !userData.userLastname ||
      !userData.userPhone
    )
      return;
    props.addUserItem(userData);
    setUserData(initState);
  };

  return (
    <form onSubmit={submitHandler} style={style.form.container}>
      <label>First Name </label>
      <br />

      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={userData.userFirstname}
        onChange={userChangeHandler}
      />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={userData.userLastname}
        onChange={userChangeHandler}
      />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        value={userData.userPhone}
        onChange={userChangeHandler}
      />

      {/* Submit Button */}
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
};

const InformationTable = (props) => {
  const sortedUsers = props.users.sort((a, b) =>
    a.userLastname.localeCompare(b.userLastname)
  );
  const display =
    sortedUsers.length > 0 ? (
      sortedUsers.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.userFirstname}</td>
          <td style={style.tableCell}>{user.userLastname}</td>
          <td style={style.tableCell}>{user.userPhone}</td>
        </tr>
      ))
    ) : (
      <tr clospan={3}>&nbsp;</tr>
    );

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>{display}</tbody>
    </table>
  );
};

const App = (props) => {
  const usersListObjc = [];
  const [users, setUsers] = useState(usersListObjc);

  const addUserItem = (user) => {
    console.log("user", users.length);
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  return (
    <section>
      <PhoneBookForm addUserItem={addUserItem} />
      <hr />
      <InformationTable users={users} />
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));


