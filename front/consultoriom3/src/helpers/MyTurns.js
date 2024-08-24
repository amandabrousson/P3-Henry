const MyTurns = [{
    id: 1,
    date: "2024-02-18",
    time: "10:00",
    status: 'active',
    userId: {
        name: "Lucio Fal",
        email: "Lucio@mail.com",
        birthdate: new Date(1990 / 11 / 11),
        dni: 35999677,
        foto: "url",
        credentialsId: 1
    }
},
{
    date: "2024-12-18",
    time: "10:00",
    status: 'active',
    userId: {
        name: "Camila Sanz",
        email: "Camila@mail.com",
        birthdate: new Date(1999 / 8 / 1),
        dni: 44999677,
        foto: "url",
        credentialsId: 2
    }
}, {
    date: "2024-07-20",
    time: "10:00",
    status: 'active',
    userId: {
        name: "Juan Perez",
        email: "juan@example.com",
        birthdate: new Date(1985, 5, 25),
        dni: 12345678,
        foto: "url",
        credentialsId: 3
    }
}
]

export default MyTurns;