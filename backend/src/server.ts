import app from "./app";
import { initialize } from "./utils";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  initialize();

  console.log(`Server running on http://localhost:${PORT}`);
});
