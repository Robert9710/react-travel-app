import { useContext, useState } from "react";
import userFactory from "../../factories/user-factory";
import "./LoginForm.css";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthSetContext } from "../../contexts/AuthContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const setUser = useContext(AuthSetContext);
  const navigate = useNavigate();
  async function login(formData: FieldValues) {
    const username = formData.username;
    const password = formData.password;
    const resp = await userFactory.login({ username, password });
    if (resp.username) {
      sessionStorage.setItem("username", resp.username);
      setUser({ username: resp.username });
      navigate("/");
    }
  }
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div id="login-form">
      <form noValidate onSubmit={handleSubmit(login)} className="card">
        <label>
          Username
          <input
            type="text"
            className="form-control"
            {...register("username", {
              required: true,
            })}
          />
        </label>
        <div className="password-group">
          <label>
            Password
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              {...register("password", {
                required: true,
              })}
            />
            {/* {errors.articleName && (
            <p className="validation-error">*Article title cannot be empty</p>
          )} */}
          </label>
          <input
            type="checkbox"
            name="show-password"
            checked={showPassword}
            onChange={handleShowPassword}
          />
        </div>
        <button type="submit" className="btn create-article-button">
          Login
        </button>
      </form>
    </div>
  );
}
