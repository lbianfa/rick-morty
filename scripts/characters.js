const cardsContainer = document.getElementById("cards-container");

const getResponse = async (url) => {
  try {
    const resJson = await fetch(url)
                              .then(res=>res.json())

    return resJson

  } catch (error) {
    console.log(error)
  }
}

const main = async () => {
  try {
    const res = await getResponse("https://rickandmortyapi.com/api/character")

    let personajes = Array.from(res.results)

    personajes = personajes.map((personaje) => {
      return {
        name: personaje.name,
        image: personaje.image,
        status: personaje.status,
        species: personaje.species,
        location: personaje.location.name,
        episode: personaje.episode[0]
      }
    })

    personajes = await Promise.all(personajes.map(async (personaje) => {

      const resEpisode = await getResponse(personaje.episode)

      const nameEpisode = resEpisode.name

      return {
        ...personaje,
        episode: nameEpisode
      }

    }))

    personajes.forEach(personaje => {
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.innerHTML = `<img
        src=${personaje.image}
        alt=""
        class="profile"
      />
      <div class="text">
        <h2>${personaje.name}</h2>
        <p><span>${personaje.status}</span> - <span>${personaje.species}</span></p>
        <p class="data">
          <span>Last known location:</span> <br />
          ${personaje.location}
        </p>
        <p class="data">
          <span>First seen in:</span> <br />
          ${personaje.episode}
        </p>
      </div>`;

      cardsContainer.append(newCard);
    })
  } catch (error) {
    alert("Ocurrio un error")
  }

}

main()