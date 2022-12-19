import express from 'express';
import cors from 'cors';

import { initRoutes } from './routers';

class App {

  public app: express.Application;

  constructor() {
     this.app = express();
     this.app.use(cors({ origin: true }));
     this.routes();
  }

  public listen() {
    const PORT = process.env.PORT || 8080;
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }

  private routes(): void {
    initRoutes(this.app);
  }

}

export default App;
