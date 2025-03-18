import {useEffect,useState} from 'react';
import api from "../api";
import Spinner from "../pages/Spinner";
import { useSnackbar } from 'notistack';

const useUserInfo=()=> {
    
  const [userInfo, setUserInfo] = useState({})
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar} = useSnackbar();
  useEffect(() => {
    setLoading(true)
    api.get('Account/userinfo')
      .then((res) => {
      setUserInfo(res.data)
      setOrderItems(res.data.items)
      }).catch((e) => {
      enqueueSnackbar("Please Login First :", { variant: "warning" });  
      console.log("Please Login First :", e.message);
    }).finally(setLoading(false))
  }, [])
    
    if (loading) {
        return <Spinner loading={loading} />
    }
    return {
        userInfo, setUserInfo, orderItems, setOrderItems, loading
    }
}

export default useUserInfo;