My personal website.

## Run locally (Rider)

This repo includes a shared run config at `.run/Portfolio Local Server.run.xml`.

1. Open the project in Rider.
2. Select **Portfolio Local Server** in the Run/Debug configuration dropdown.
3. Press **F5** (or click Run).
4. Open `http://localhost:8000`.

If the run config does not appear, run the script directly:

```zsh
./scripts/serve-local.sh
```

Use a custom port if needed:

```zsh
./scripts/serve-local.sh 8080
```

Plugins used:
- [Hover](https://ianlunn.github.io/Hover)
- [AOS](https://michalsnik.github.io/aos)
- [Bootstrap](https://getbootstrap.com)
- [icons8](https://icons8.com)