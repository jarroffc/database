const apiKey = "jarrdb";
const baseUrl = window.location.origin;

function fetchList() {
  fetch(`${baseUrl}/listnomor?key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("listNomor");
      list.innerHTML = "";
      data.data.forEach(nomor => {
        const li = document.createElement("li");
        li.innerHTML = `${nomor} <button onclick="hapusNomor('${nomor}')">Hapus</button>`;
        list.appendChild(li);
      });
    });
}

function tambahNomor() {
  const nomor = document.getElementById("nomor").value;
  if (!nomor) return alert("Nomor tidak boleh kosong!");
  fetch(`${baseUrl}/aksesnomor?key=${apiKey}&nomor=${nomor}`)
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      fetchList();
    });
}

function hapusNomor(nomor) {
  fetch(`${baseUrl}/delnomor?key=${apiKey}&nomor=${nomor}`)
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      fetchList();
    });
}

fetchList();