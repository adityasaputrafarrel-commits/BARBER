function pilih(layanan, harga){
    let nama = document.getElementById("nama").value.trim();
    if(!nama){
        alert("Silakan masukkan nama pelanggan!");
        return;
    }

    localStorage.setItem("trx", JSON.stringify({
        nama,
        layanan,
        harga,
        tanggal: new Date().toLocaleString()
    }));

    location.href = "pembayaran.html";
}

if(document.getElementById("detail")){
    let t = JSON.parse(localStorage.getItem("trx"));
    document.getElementById("detail").innerText = `${t.nama} - ${t.layanan} - Rp ${t.harga}`;
}

function qris(){
    document.getElementById("extra").innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GoldScissors" />
        <br><br>
        <button onclick="selesai('QRIS')">Selesai</button>
    `;
}

function cash(){
    let t = JSON.parse(localStorage.getItem("trx"));
    document.getElementById("extra").innerHTML = `
        <p>Total: Rp ${t.harga}</p>
        <input id="uang" type="number" placeholder="Uang Bayar">
        <br>
        <button onclick="bayarCash()">Bayar</button>
    `;
}

function bayarCash(){
    let uang = document.getElementById("uang").value;
    let t = JSON.parse(localStorage.getItem("trx"));

    if(uang < t.harga){ alert("Uang kurang!"); return; }

    t.metode = "Cash";
    t.bayar = uang;
    t.kembali = uang - t.harga;
    simpan(t);
}

function selesai(metode){
    let t = JSON.parse(localStorage.getItem("trx"));
    t.metode = metode;
    simpan(t);
}

function simpan(t){
    let r = JSON.parse(localStorage.getItem("riwayat")) || [];
    r.push(t);
    localStorage.setItem("riwayat", JSON.stringify(r));
    localStorage.setItem("trx", JSON.stringify(t));
    location.href = "struk.html";
}

if(document.getElementById("struk")){
    let t = JSON.parse(localStorage.getItem("trx"));
    document.getElementById("struk").innerHTML = `
        <h3 style="text-align:center">GoldScissors Barber</h3>
        <hr>
        Nama Pelanggan: ${t.nama}<br>
        Layanan : ${t.layanan}<br>
        Harga : Rp ${t.harga}<br>
        Bayar : ${t.metode}<br>
        ${t.bayar ? `Uang: Rp ${t.bayar}<br>Kembali: Rp ${t.kembali}<br>` : ``}
        <hr>
        ${t.tanggal}<br>
        <p style="text-align:center">Terima Kasih!</p>
    `;
}
