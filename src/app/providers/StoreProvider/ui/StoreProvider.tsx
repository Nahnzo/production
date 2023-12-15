import { ReactNode } from "react";
import { Provider } from "react-redux";
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { createReduxStore } from "../config/store";
import { StateScheme } from "../config/StateSchema";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
}

const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;
  // const navigate = useNavigate();
  const store = createReduxStore(
    initialState as StateScheme,
    asyncReducers as ReducersMapObject<StateScheme>
    // navigate
  );
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
