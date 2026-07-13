# Nidus — Site

Landing page da Nidus. Site estático: HTML + React (via CDN) + design system próprio (tokens + componentes JSX compilados no navegador).

## Rodar local

O site precisa ser servido por **HTTP** (os componentes são carregados via `fetch`, que não funciona abrindo o arquivo direto no navegador):

```
python -m http.server 8099
# abra http://127.0.0.1:8099
```

## Estrutura

- `index.html` — a página
- `styles.css` + `tokens/` — design system (cores, tipografia, espaçamento)
- `ds-loader.js` + `components/` — componentes de UI
- `assets/` — imagens

## Publicar (GitHub Pages)

Settings → Pages → Source: Deploy from a branch → Branch: `main` / root. O site fica no ar em poucos minutos.
