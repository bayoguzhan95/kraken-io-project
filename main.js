const form = document.getElementById("form");
const link = document.getElementById("input-a");
const API_KEY = "560746f0dacbed87977477dd98047fa8";
const API_SECRET = "111fa40018a247ae14b30e27fe991635adfc35e7";
const URL = "https://api.kraken.io/v1/url";

var response = "";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("button").disabled = true;

  postMethod();
});

function postMethod() {
  var params = {
    auth: {
      api_key: API_KEY,
      api_secret: API_SECRET,
    },
    url: link.value,
    wait: true,
  };
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", URL);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(params));
  xmlhttp.timeout = 1500;
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      try {
        var response = JSON.parse(xmlhttp.responseText);
        if (response.success) {
          document.getElementById("infoText").innerHTML = `<thead>
          <tr><th class="txt" > Oluşturulan Link :</th></tr></thead><td ><a class="txt" href="${response.kraked_url}" >${response.kraked_url}</a></td>`;

          document.getElementById("button").disabled = false;
        } else {
          document.getElementById(
            "infoText"
          ).innerHTML = `Lütfen URL Giriniz...`;

          document.getElementById("input-a").value = "";
          document.getElementById("button").disabled = false;
        }
      } catch (error) {
        document.getElementById("infoText").innerHTML =
          "Lütfen Geçerli URL Giriniz...";
        document.getElementById("input-a").value = "";
        document.getElementById("button").disabled = false;
      }
    }
  };
}
