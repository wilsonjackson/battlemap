import {createContext} from "react";
import {initialState} from "../hooks/useBattle";

const BattleContext = createContext(initialState);
export default BattleContext;
