const NAME_DB = 'users'
const HOSTNAME = 'http://localhost:4600/'

function onValidateUserForm() {
  const dni = document.getElementById('dni')
  const btnGuardar = document.getElementById('btn-guardar')

  if (dni.value.length > 8) {
    btnGuardar.removeAttribute('disabled')
  } else {
    btnGuardar.setAttribute('disabled', true)
  }
}

function onClickUserForm() {
  const username = document.getElementById('username')

  let db = localStorage.getItem(NAME_DB)

  if (db === null) {
    db = {
      counter: 1,
      users: [],
    }
  } else {
    db = JSON.parse(db)
  }

  db.users.push({
    id: db.counter,
    dni: dni.value,
    name: username.value,
    surname: surname.value,
    dog: dog.value,
  })
  db.counter++
  localStorage.setItem(NAME_DB, JSON.stringify(db))
  username.value = ''
  alert('El usuario se ha creado correctamente')
}

function drawUsers() {
  const userContainer = document.getElementById('home-container')
  userContainer.innerHTML = ''

  let db = localStorage.getItem(NAME_DB)
  if (db === null) {
    // alert ('la base de datos no existe')
    return
  }
  db = JSON.parse(db)

  let count = 0
  while (count < db.users.length) {
    const template = `
        <tr>
            <th scope="row">${count + 1}</th>
            <td>${db.users[count].name}</td>
            <td>${db.users[count].dog}</td>
            <td><img src="img/husky-gc.jpg" alt="mascota" width="5%" class="img-fluid"></td>
        </tr>
        `
    userContainer.innerHTML += template
    count++
  }
}

function onUserRomove(id) {
  let db = localStorage.getItem(NAME_DB)
  if (db === null) {
    // alert ('la base de datos no existe')
    return
  }
  db = JSON.parse(db)

  let count = 0
  let index = -1
  let name = ''
  while (count < db.users.length) {
    if (db.users[count].id === id) {
      index = count
      name = db.users[count].name
    }
    count += 1
  }

  if (index > -1) {
    db.users.splice(index, 1)

    localStorage.setItem(NAME_DB, JSON.stringify(db))
    alert(`Se va a eliminar el cliente ${name} con id ${id}`)
  }
}

function editModal() {}

function onUserEdit(id) {
  window.location.href = HOSTNAME + 'edit' + '?' + 'userId=' + id
}

//actualizar
// setInterval(drawUsers, 2000)

// cargar pagina al actualizar
window.onload = drawUsers()
