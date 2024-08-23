import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    token: null,
    userId: null,
};

function AuthReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload,
                userId: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state, 
                token: null, 
                userId: null
            };
        default:
            return state;
    }
}
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = (token, userId) => {
        dispatch({ type: 'LOGIN', payload: { token, userId } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    
    return (
        <AuthContext.Provider value={{ token: state, userId: statusbar.userId,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
};
// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, AuthContext, useAuth };
