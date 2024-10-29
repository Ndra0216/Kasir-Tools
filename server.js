const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Menghidangkan file statis

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { data } = req.body; // Ambil data absensi dari permintaan

    // Konfigurasi transporter nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Ganti dengan layanan email yang Anda gunakan
        auth: {
            user: 'bangindrabang123@.com', // Ganti dengan email Anda
            pass: 'Ndra02162003' // Ganti dengan password Anda
        }
    });

    const mailOptions = {
        from: 'bangindrabang123@gmail.com',
        to: 'bangindrabang123@.com', // Ganti dengan email penerima
        subject: 'Data Absensi Bulanan',
        text: JSON.stringify(data, null, 2) // Format data sebagai string JSON
    };

    // Kirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Mulai server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
