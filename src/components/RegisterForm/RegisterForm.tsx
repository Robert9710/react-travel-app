import { useState } from "react";
import userFactory from "../../factories/user-factory";
import "./RegisterForm.css";
import { FieldValues, useForm } from "react-hook-form";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  function registerUser(formData: FieldValues) {
    const username = formData.username;
    const password = formData.password;
    userFactory.registerUser({ username, password });
  }
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div id="register-form">
      <form noValidate onSubmit={handleSubmit(registerUser)} className="card">
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
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              })}
            />
          </label>
          {errors.password && (
            <p className="validation-error">
              *Password must contain at least 8 characters, an uppercase letter,
              a lowercaser letter, a number and a special character from the
              following list: #,?,!,@,$,%,^,&,*,-
            </p>
          )}
          <input
            type="checkbox"
            name="show-password"
            checked={showPassword}
            onChange={handleShowPassword}
          />
        </div>
        <button type="submit" className="btn create-article-button">
          Register
        </button>
      </form>
    </div>
  );
}
