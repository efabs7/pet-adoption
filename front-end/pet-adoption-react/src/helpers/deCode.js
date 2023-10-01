export const deCode = (token) => {
  try {
    // const payload = JSON.parse(window.atob(token.split(".")[1]).id);
    // console.log(atob(token.split(".")[1]).id);
    // const payload = atob(token.split(".")[1]).id;

    // console.log(payload);
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    console.log(JSON.parse(jsonPayload).id);
    return JSON.parse(jsonPayload).id;
  } catch (err) {
    console.log(err);
    return;
  }
};
