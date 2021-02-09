const express = require("express")
let buku = require("./db/data.json")
const app = express()

//middle
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/*Mengambil data (get)*/
app.get("/buku", (req, res) => {
    res.status(200).json(buku)
})

//berdasarkan id
app.get("/buku/:id", (req, res) => {
    const post = buku.find(i => i.id === +req.params.id)
    res.status(200).json(buku)
})
/*END OF GET*/
/*Menampilkan data (post)*/
app.post("/buku", (req, res) => {
    const {isbn, judul, sinopsis, penulis, genre} = req.body
    const id = buku[buku.length - 1].id+1
    const post = {
        id, isbn, judul, sinopsis, penulis, genre
    }

    buku.push(post)
    res.status(201).json({
        message: 'Data dengan id ${req.params.id} berhasil ditambahkan',
        data: buku,
    })
})
/*END OF POST*/
/*Mengupdate data (put)*/
app.put("/buku/:id", (req, res) => {
    const id = req.params.id
    buku.filter((post) => {
        if(post.id == id){
            post.isbn = req.body.isbn
            post.judul = req.body.judul
            post.sinopsis = req.body.sinopsis
            post.penulis = req.body.penulis
            post.genre = req.body.genre
            return post
        }
    })
    res.status(200).json(buku)
})
/*END OF PUT*/
/*Menghapus data*/
app.delete("buku/:id", (req, res) => {
    buku = buku.filter(i => i.id != +req.params.id)
    res.status(200).json({
        message: 'Data dengan id ${req.params.id} berhasil dihapus',
        data: buku,
    })
})

app.listen(3000, () => {
    console.log("SERVER BERHASIL DIJALANKAN");
})