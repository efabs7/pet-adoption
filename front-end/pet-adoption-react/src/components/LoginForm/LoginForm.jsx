import { Btn } from "../../UIKit/Elements/Btn/Btn";
import Box from "../Box/Box";
import { Rows } from "../../UIKit/Layouts/Rows/Rows";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Input } from "../Input/Input";
import { Line } from "../../UIKit/Layouts/Line/Line";
import "./LoginForm.css";
export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <div className="LoginForm">
      <Box>
        <Rows>
          <Rows>
            <p>Enter Email:</p>

            <Input
              value={email}
              placeholder="enter email.."
              onChange={setEmail}
            />
          </Rows>

          <Rows>
            <p>Password:</p>

            <Input
              value={password}
              placeholder="enter password..."
              onChange={setPassword}
            />
          </Rows>
        </Rows>
        <Btn onClick={onSubmit}>Login</Btn>
      </Box>
    </div>
  );
};
