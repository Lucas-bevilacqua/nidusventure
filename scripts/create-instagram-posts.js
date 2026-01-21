const fs = require('fs');
const path = require('path');

const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/instagram/posts-data.json'), 'utf8'));
const template = fs.readFileSync(path.join(__dirname, '../public/instagram/post-template.html'), 'utf8');

postsData.forEach(post => {
    let html = template;
    
    // Substituir placeholders
    html = html.replace('id="title">TÍTULO</div>', `id="title">${post.title}</div>`);
    html = html.replace('id="subtitle">Subtítulo</div>', `id="subtitle">${post.subtitle || ''}</div>`);
    html = html.replace('id="text">Texto do post aqui</div>', `id="text">${post.text}</div>`);
    html = html.replace('id="cta">Link na bio →</div>', `id="cta">${post.cta}</div>`);
    
    // Ajustar estilos baseado no tipo
    if (post.type === 'quote') {
        html = html.replace('.title {', '.title {\n            font-size: 84px;');
        html = html.replace('.text {', '.text {\n            font-size: 42px;\n            font-style: italic;');
    }
    
    if (post.type === 'stat') {
        html = html.replace('.title {', '.title {\n            font-size: 96px;');
    }
    
    if (post.type === 'case') {
        html = html.replace('.text {', '.text {\n            font-size: 32px;');
    }
    
    // Salvar arquivo
    const filename = `${post.filename}.html`;
    fs.writeFileSync(
        path.join(__dirname, `../public/instagram/${filename}`),
        html
    );
    
    console.log(`✅ Criado: ${filename}`);
});

console.log(`\n🎉 ${postsData.length} posts criados em public/instagram/`);
console.log('📝 Abra os arquivos HTML no navegador e tire screenshot (1080x1080px)');
