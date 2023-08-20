import { Elysia } from "elysia";

type ExtractPath<T> = T extends Elysia<infer P, infer I> ? P : never;
type ExtractAndVerifyInstance<T, R> = T extends Elysia<infer P, infer I>
  ? I extends R
  ? I
  : never
  : never;

const app = new Elysia()
  .state("mykey", "hello")
  .state("another", "hello")

  .group("mypath", (app) => {
    type MyRequirements = {
      store: {
        mykey: string;
      };
    };

    type PathType = ExtractPath<typeof app>;
    type InstanceType = ExtractAndVerifyInstance<typeof app, MyRequirements>;

    const verified: Elysia<PathType, InstanceType> = app;

    return app.get('/', ({ store }) => store.mykey);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
