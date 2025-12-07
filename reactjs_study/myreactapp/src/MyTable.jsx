function MyTable() {

    const data = [
        { id: 1, brand: 'Ford', model: 'Mustand' },
        { id: 2, brand: 'VW', model: 'Golf' },
        { id: 3, brand: 'Toyota', model: 'Lexus' },
        { id: 4, brand: 'Honda', model: 'Civic' },
        { id: 5, brand: 'Nissan', model: 'Mazad' },
    ];

    return (
        <>
            <table>
                <tbody>
                    {
                        data.map((item) =>
                            <tr key={item.id}>
                                <td>{item.brand}</td><td>{ item.model}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
export default MyTable;