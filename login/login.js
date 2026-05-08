function handleCredentialResponse(response) {

    const data = parseJwt(response.credential);

    // salva dados
    localStorage.setItem("nome", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("foto", data.picture);

    // redireciona
    window.location.href = "../pesquisa/pesquisa.html";
}

function parseJwt(token) {

    const base64Url = token.split('.')[1];

    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
    );

    return JSON.parse(jsonPayload);
}