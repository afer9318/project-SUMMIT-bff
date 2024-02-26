import express from 'express';

class App {
    constructor(appInit) {
        this.app = express();
        this.port = appInit.port;
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;