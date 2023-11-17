const validarRandom = (resolver, reject) => {
  number = Math.floor(Math.random() * 10);

  if (number % 2 === 0) {
    resolver(number)
  } else {
    reject(number)
  }

}

const obtenerRandom = async () => {

  try {
    const par = await new Promise(validarRandom)

    console.log(par)
  } catch (impar) {
    console.log(impar)
  }

}

obtenerRandom()