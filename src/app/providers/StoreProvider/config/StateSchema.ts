import { CounterScheme } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "feautures/AuthByUsername";

export interface StateScheme {
  counter: CounterScheme;
  user: UserSchema;
  loginForm: LoginSchema;
}
