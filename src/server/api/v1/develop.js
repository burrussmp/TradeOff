const version = 1; // the version

module.exports = app => {
    /**
     * Handle a submission of a cell
     *
     * @param {req.body.code} Code to execute on the server from a particular cell
     * @return {{200 with { output: output of the execution}}}
     */
    app.post(`/v${version}/develop`, async (req, res) => {
        const data = req.body.code;
        console.dir(data)
        console.log(`Data that was sent ${data}`)
        res.status(200).send({ output: "Output of console" });
    });
}