import { createContext , useState} from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const[user, setUser] = useState(null);
<<<<<<< HEAD
<<<<<<< HEAD
    const[showLogin, setShowLogin] = useState(false);

    const value = {
      user,
      setUser,
      showLogin,
      setShowLogin
    };
=======

    const value = {
        user, setUser
    }
>>>>>>> origin/main
=======
    const[showLogin, setShowLogin] = useState(false);

    const value = {
      user,
      setUser,
      showLogin,
      setShowLogin
    };
>>>>>>> origin/main
    return(

      <AppContext.Provider value={value}>
        {props.children}
      </AppContext.Provider>
    );
}
export default AppContextProvider;