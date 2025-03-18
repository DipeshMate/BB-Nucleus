import {useEffect,useState} from 'react';
import api from "../api";
import { useParams } from 'react-router-dom';
import Spinner from "../pages/Spinner";
import { animate } from "framer-motion";
import Error from '../pages/Error';


function useProductData() {
  const { type } = useParams();  
  const [allBats, setAllBats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const scrollToTop = () => {
    animate(0, 0, {
      duration: 0.5, // Adjust duration
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
    };
    
    //fetch all products from the backend
  useEffect(() => {
    const fetchBats = async () => {
      setLoading(true);
      try {
        const endpoint = type ? `/Home/types/${type}` : `/Home`;
        const res = await api.get(endpoint);
          setAllBats(res.data);
          scrollToTop()
      } catch (err) {
        console.error('Error fetching bats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBats();
  }, [type]);
    
    
  if (loading) {
    return <Spinner loading={loading} />
}
    
    return {
        allBats, setAllBats, loading, setLoading, Error,type
    }
}
export default useProductData;