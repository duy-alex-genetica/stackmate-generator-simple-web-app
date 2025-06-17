import { AppDispatch } from "packages/frontend/store";
import { useDispatch } from "react-redux";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
