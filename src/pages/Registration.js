import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const Registration = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [registred, setRegistred] = useState(false)
  const [failure, setFailure] = useState(false)
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:8081/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status !== 201) {
          return (
            res.json().then(json => console.log(json.message)), setFailure(true)
          )
        } else {
          setRegistred(true)
          setTimeout(reDirect, 2000);
        }
      })
      .catch(err => console.log("Error:", err))
  }

  const reDirect = () => {
    history.push(`/login`)
  }


  return (
    <div className="field-container">
      {registred &&
        <h1 className="heading" color={"#fff"}>Success! Continuing to login...</h1>
      }
      {!registred && (
        <div className="field-container">
          <form onSubmit={handleSubmit}>
            {!failure && <h1 className="heading">CREATE NEW USER</h1>}
            {failure && (
              <h1 className="heading">
                User not created. Try using another name or email!
              </h1>
            )}
            <label>
              Name {name.length < 2 && name.length !== 0 && " is too short"}
              {name.length > 20 && " is too long"}
              <input
                type="text"
                required
                value={name}
                onChange={event => setName(event.target.value)}
              ></input>
            </label>
            <label>
              Email
              <input
                lowercase
                type="text"
                required
                value={email}
                onChange={event => setEmail(event.target.value.toLowerCase())}
              ></input>
            </label>
            <label>
              Password{" "}
              {password.length < 5 && password.length !== 0 && " is too short"}
              <input
                type="password"
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              ></input>
            </label>
            <button
              className="form-button"
              type="submit"
              disabled={
                name.length > 1 &&
                name.length < 21 &&
                password.length > 4 &&
                email
                ? false
                : true
              }
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
            <button
              className="form-button" 
              type="button" 
              onClick={reDirect}
            >
              Already a member?
            </button>
          </form>
        </div>
      )}
    </div>
  )
}