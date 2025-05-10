import { UserJwtContext } from "./UserJwtContext";

export function UserJwtProvider({children}){

	return(
		<UserJwtContext.Provider value="example jwt value from custom component">
			{children}
		</UserJwtContext.Provider>
	)
}
