import { app } from "./app";
import { env } from "./infrastructure/config/env";

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mini-Kanban API running on port ${env.PORT}.`);
});
