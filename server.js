const e = require('express');
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = `${__dirname}/aquatic-plants/`;

const app = e();

app.use(e.static(PUBLIC_DIR));


app.get('*', (req, res) => {
    res.sendFile(`${PUBLIC_DIR}/index.html`);
});

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));