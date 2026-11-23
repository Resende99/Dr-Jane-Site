# Dra. Jane — Tricologia de Precisão

Protótipo responsivo em React + Vite para apresentação do Método Regenerador. Textos, perguntas, perfis, dados da médica, imagens e WhatsApp estão centralizados em `src/data/` e `src/config.js`.

## Rodar localmente

```bash
npm install
npm run dev -- --host
```

Para abrir no celular, conecte computador e celular à mesma rede Wi-Fi, rode o comando acima e abra no navegador do celular o endereço de rede mostrado pelo Vite (por exemplo, `http://192.168.0.10:5173`). Se o firewall do Windows perguntar, permita acesso à rede privada.

## Publicar na Vercel

Importe este repositório na Vercel. O preset Vite detecta o build automaticamente; os comandos são `npm run build` e diretório de saída `dist`.

Antes da publicação, substitua os dados de demonstração em `src/config.js`, `src/data/doctor.js` e `src/data/images.js`. Confirme as credenciais e informações profissionais, o telefone e as imagens. Depoimentos e indicadores atuais são placeholders. Fotos de pacientes, inclusive comparativos de antes/depois, exigem autorização específica. As URLs externas do Unsplash dependem de conexão.
