const DOG_DB = 'dogs'
const HOSTDOG = 'http://localhost:4600/'

function onValidateDogForm() {
  const dogname = document.getElementById('dogname')
  const btnGuardar = document.getElementById('btn-save')

  if (dogname.value.length > 2) {
    btnGuardar.removeAttribute('disabled')
  } else {
    btnGuardar.setAttribute('disabled', true)
  }
}

function onClickDogForm() {
  const dogname = document.getElementById('dogname')

  let dogdb = localStorage.getItem(DOG_DB)

  if (dogdb === null) {
    dogdb = {
      counter: 1,
      dogs: [],
    }
  } else {
    dogdb = JSON.parse(dogdb)
  }

  dogdb.dogs.push({
    id: dogdb.counter,
    name: dogname.value,
    age: age.value,
    dog: dog.value,
  })
  dogdb.counter++
  localStorage.setItem(DOG_DB, JSON.stringify(dogdb))
  dogname.value = ''
  alert('La mascota se ha creado correctamente')
}

function onClickDogEditForm(count) {
  let dbdog = localStorage.getItem(DOG_DB)
  if (dbdog) {
      dbdog = JSON.parse(dbdog)
      const dogEdit = dbdog.dogs[count]
      console.log(dogEdit)
      const dogNameEdit = document.getElementById('dogname-edit')
      const ageEdit = document.getElementById('age-edit')
      const dogRazaEdit2 = document.getElementById('dog-edit2')
      dogNameEdit.value = dogEdit.dogname
      ageEdit.value = dogEdit.age
      dogRazaEdit2.value = dogEdit.dog
    }
  }

function drawDogs() {
  const dogContainer = document.getElementById('dog-container')
  dogContainer.innerHTML = ''

  let dogdb = localStorage.getItem(DOG_DB)
  if (dogdb === null) {
    // alert ('la base de datos no existe')
    return
  }
  dogdb = JSON.parse(dogdb)

  let count = 0
  while (count < dogdb.dogs.length) {
    const template = `
        <tr>
            <th scope="row">${count + 1}</th>
            <td>${dogdb.dogs[count].name}</td>
            <td>${dogdb.dogs[count].age}</td>
            <td>${dogdb.dogs[count].dog}</td>
            <td>
                <!-- button group -->
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button onclick="onClickDogEditForm(${
                      dogdb.dogs[count].id
                    })" type="button" class="btn btn-success"
                    data-toggle="modal"
                    data-target="#exampleModal-edit2"
                    >Edit</button>
                    <button onclick="onDogRemove(${
                      dogdb.dogs[count].id
                    })" type="button" class="btn btn-danger">Delete</button>
                </div>
            </td>
        </tr>
        `
    dogContainer.innerHTML += template
    count++
  }
}

function onDogRemove(id) {
  let dogdb = localStorage.getItem(DOG_DB)
  if (dogdb === null) {
    // alert ('la base de datos no existe')
    return
  }
  dogdb = JSON.parse(dogdb)

  let count = 0
  let index = -1
  let name = ''
  while (count < dogdb.dogs.length) {
    if (dogdb.dogs[count].id === id) {
      index = count
      name = dogdb.dogs[count].name
    }
    count += 1
  }

  if (index > -1) {
    dogdb.dogs.splice(index, 1)

    localStorage.setItem(DOG_DB, JSON.stringify(dogdb))
    alert(`Se va a eliminar la mascota ${name} con id ${id}`)
  }
}

function editModal () {
    
}

// function onDogEdit(id) {
//   window.location.href = HOSTDOG + 'edit' + '?' + 'userId=' + id
// }

//actualizar
setInterval(drawDogs, 2000)

// cargar pagina al actualizar
window.onload = drawDogs()

