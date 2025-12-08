import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function Repositories() {

    const getRepositories = async () => {
        const response = await axios.get("https://api.github\
            .com/search/reposities?q=react");
        
        return response.data.items;
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: ['repositories'],
        queryFn: getRepositories
    })

    return (
        <></>
    )
}
export default Repositories;