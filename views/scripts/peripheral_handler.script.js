const runPyScriptToHibernateDevice = () => {
    fetch('http://127.0.0.1:3000/shut', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then((json) => console.log(json));
}