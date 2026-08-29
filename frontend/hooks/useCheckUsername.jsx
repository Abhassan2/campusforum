import { useAuthContext } from '@/app/context/authContext'

export default function useCheckUsername({username}) {
    const { currentUser } = useAuthContext();

    if(currentUser?.owner?.username === username){
        return true;
    } else {
        return false
    }

}
