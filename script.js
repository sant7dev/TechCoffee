document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Modal "Ver detalhes" (páginas de produto) ---------- */
    document.querySelectorAll('.botao_produto').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.produto_card');
            if (!card) return;

            const nome = card.querySelector('h3')?.textContent.trim() || '';
            const desc = card.querySelector('.info_text')?.textContent.trim() || '';
            const preco = card.querySelector('.preco')?.textContent.trim() || '';
            const img = card.querySelector('img');

            abrirModalProduto({
                nome,
                desc,
                preco,
                imgSrc: img?.getAttribute('src') || '',
                imgAlt: img?.getAttribute('alt') || nome
            });
        });
    });

    function abrirModalProduto({ nome, desc, preco, imgSrc, imgAlt }) {
        const overlay = document.createElement('div');
        overlay.className = 'modal_overlay';
        overlay.innerHTML = `
            <div class="modal_box" role="dialog" aria-modal="true" aria-label="${nome}">
                <button class="modal_fechar" aria-label="Fechar">&times;</button>
                <img src="${imgSrc}" alt="${imgAlt}">
                <h3>${nome}</h3>
                <p class="info_text">${desc}</p>
                <span class="preco">${preco}</span>
                <button class="botao_produto">
                    <p class="kit-text">Adicionar ao carrinho</p>
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const fechar = () => {
            overlay.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeyDown);
        };
        const onKeyDown = (e) => {
            if (e.key === 'Escape') fechar();
        };

        overlay.querySelector('.modal_fechar').addEventListener('click', fechar);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) fechar();
        });
        document.addEventListener('keydown', onKeyDown);
    }
});
