export async function GET(url) {
    return await fetch('http://localhost:8081/api/' + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem('token') != null ? localStorage.getItem('token') : "" // Indica que se enviarán datos en formato JSON
        }
    })
        .then(response => response.json())
        .catch(error => {
            // Manejar el error aquí
            console.error('Error en la llamada', error);
            throw error; // Re-lanzar el error para que pueda ser capturado por el llamante
        });
}

export async function GETfiles(url) {
    let urli = "";
    await fetch('http://localhost:8081/api/' + url)
        .then(response => response.blob())  // Convierte la respuesta en un blob
        .then(blob => {
            // Crear un objeto URL que apunte al blob
            const imgUrl = URL.createObjectURL(blob);
            // Asignar el URL creado al atributo src de la imagen
            urli = imgUrl
        })
        .catch(error => console.error('Error al cargar la imagen:', error));
    
    return urli;
}

export async function POST(url, data) {
    let res;
    await fetch('http://localhost:8081/api/' + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "token": localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json()) // Manejo de la respuesta
        .then(data => {
            res = data
        })

    return res;

}

export async function POSTfiles(url, data) {
    let res;
    // Para recorrer el FormData y ver su contenido
    for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
    }
    await fetch('http://localhost:8081/api/' + url, {
        method: 'POST',
        body: data
    })
        .then(response => response.json()) // Manejo de la respuesta
        .then(data => {
            res = data
        })

    return res;

}

export async function PUT(url, data) {
    let res;
    await fetch('http://localhost:8081/api/' + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "token": localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json()) // Manejo de la respuesta
        .then(data => {
            res = data
        })

    return res;

}

export async function PUTfiles(url, data) {
    let res;
    // Para recorrer el FormData y ver su contenido
    for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
    }
    await fetch('http://localhost:8081/api/' + url, {
        method: 'PUT',
        body: data
    })
        .then(response => response.json()) // Manejo de la respuesta
        .then(data => {
            res = data
        })

    return res;

}