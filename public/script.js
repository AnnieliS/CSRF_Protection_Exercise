const button = document.getElementById("thisbutton");

const handleSubmit = () => {
    const params = window.location.href.split('?')[1]
    const key = params.split('=')[1]
    const http = new XMLHttpRequest()
    const url = '/check'
    const body = { key }
    http.open('POST', url, true)
    http.setRequestHeader('Access-Control-Allow-Origin', '*')
    http.setRequestHeader('X-XSS-Protection', '0')
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    http.onreadystatechange = () => {
        if (http.readyState == 4) {
            if (http.status == 500) {
                window.location = "http://localhost:5069/fail.html"
                return
            }
            alert("compra exitosa")
            window.location.href = "http://localhost:5069"
        }
    }
    http.send(JSON.stringify(body))
}

button.onclick = handleSubmit;