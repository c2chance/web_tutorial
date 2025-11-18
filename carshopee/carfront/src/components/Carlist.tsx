import { useQuery } from '@tanstack/react-query'
import { getCars } from '../api/carapi'


function Carlist() {
    const { data, error, isSuccess } = useQuery({
        queryKey: ["cars"],
        queryFn: getCars
    })
    if (!isSuccess) {
        return Loading...
    } else if (error) {
        return Error when fetching cars...
    } else {
        return (
            <table>
                <tbody>
                    {
                        data.map((car: CarResponse) => 
                            <tr key={car._links.self.href}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.color}</td>
                                <td>{car.registractionNumber}</td>
                                <td>{car.modelYear}</td>
                                <td>{ car.price}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
    return (
        <></>
    );
}
export default Carlist;