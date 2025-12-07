
function ReactEventHandlerSimple() {

    const handleClick = () => {
        alert('Button pressed');
    }

    return (
        <>
            <button onClick={handleClick}>Press me</button>
        </>
    )
}
export default ReactEventHandlerSimple;