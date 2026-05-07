document.addEventListener('DOMContentLoaded', () => {
    
    const homeView = document.getElementById('home-view');
    const savedIdeasView = document.getElementById('saved-ideas-view');
    const pinDetailView = document.getElementById('pin-detail-view');
    const pinContainer = document.getElementById('pin-container');
    const relatedPinsContainer = document.getElementById('related-pins-container');
    
    const pinsEmptyState = document.getElementById('pins-empty-state');
    const savedPinsGrid = document.getElementById('saved-pins-grid');
    const tablerosEmptyState = document.getElementById('tableros-empty-state');
    const savedBoardsGrid = document.getElementById('saved-boards-grid');
    const collagesPublishedState = document.getElementById('collages-published-state');
    const publishedCollagesGrid = document.getElementById('published-collages-grid');
    
    const navInicio = document.getElementById('nav-inicio');
    const navTableros = document.getElementById('nav-tableros');
    const navPerfil = document.getElementById('nav-perfil');
    const navPerfilTop = document.getElementById('nav-perfil-top');
    const savedIdeasProfileImg = document.getElementById('saved-ideas-profile-img');
    
    const secondarySidebar = document.getElementById('secondary-sidebar');
    const slidePanels = document.querySelectorAll('.slide-panel-content');
    const btnCriar = document.getElementById('nav-criar');
    const btnAtualizacoes = document.getElementById('nav-atualizacoes');
    const btnMensagens = document.getElementById('nav-mensagens');
    const btnConfig = document.getElementById('nav-config');
    const closePanelBtns = document.querySelectorAll('.close-panel-btn');

    const shareProfileBtn = document.getElementById('share-profile-btn');
    const shareMenu = document.getElementById('share-menu');
    const savedCrearBtn = document.getElementById('saved-crear-btn');
    const savedCrearMenu = document.getElementById('saved-crear-menu');
    const tabButtons = document.querySelectorAll('#saved-ideas-tabs .nav-link');
    const tabContents = document.querySelectorAll('.tab-content-view');

    const createPinModalEl = document.getElementById('createPinModal');
    const createPinModal = createPinModalEl ? new bootstrap.Modal(createPinModalEl) : null;
    const createTableroModalEl = document.getElementById('createTableroModal');
    const createTableroModal = createTableroModalEl ? new bootstrap.Modal(createTableroModalEl) : null;
    const createCollageModalEl = document.getElementById('createCollageModal');
    const createCollageModal = createCollageModalEl ? new bootstrap.Modal(createCollageModalEl) : null;
    const editPinModalEl = document.getElementById('editPinModal');
    const editPinModal = editPinModalEl ? new bootstrap.Modal(editPinModalEl) : null;

    let currentEditingPinElement = null;

    if (navPerfilTop) navPerfilTop.addEventListener('click', () => window.location.href = 'profile.html');
    if (savedIdeasProfileImg) {
        savedIdeasProfileImg.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }
    if (navPerfil && !document.querySelector('.profile-page-body')) {
        navPerfil.addEventListener('click', () => window.location.href = 'profile.html');
    }

    function toggleSidebarPanel(panelId, btnElement) {
        const targetPanel = document.getElementById(panelId);
        if(!targetPanel) return;
        
        const isOpen = secondarySidebar.classList.contains('open') && !targetPanel.classList.contains('d-none');

        slidePanels.forEach(panel => panel.classList.add('d-none'));
        [btnCriar, btnAtualizacoes, btnMensagens, btnConfig].forEach(btn => btn?.classList.remove('active'));

        if (isOpen) {
            closeSidebar();
        } else {
            targetPanel.classList.remove('d-none');
            btnElement.classList.add('active');
            secondarySidebar.classList.add('open');
            document.body.classList.add('panel-open');
            navInicio?.classList.remove('active');
            navTableros?.classList.remove('active');
        }
    }

    function closeSidebar() {
        if(!secondarySidebar) return;
        secondarySidebar.classList.remove('open');
        document.body.classList.remove('panel-open');
        [btnCriar, btnAtualizacoes, btnMensagens, btnConfig].forEach(btn => btn?.classList.remove('active'));
        if (homeView?.classList.contains('active-view')) navInicio?.classList.add('active');
        else if (savedIdeasView?.classList.contains('active-view')) navTableros?.classList.add('active');
    }

    btnCriar?.addEventListener('click', () => toggleSidebarPanel('panel-criar', btnCriar));
    btnAtualizacoes?.addEventListener('click', () => toggleSidebarPanel('panel-atualizacoes', btnAtualizacoes));
    btnMensagens?.addEventListener('click', () => toggleSidebarPanel('panel-mensagens', btnMensagens));
    btnConfig?.addEventListener('click', () => toggleSidebarPanel('panel-config', btnConfig));
    closePanelBtns.forEach(btn => btn.addEventListener('click', closeSidebar));

    function switchToSection(targetSectionId) {
        closeSidebar();
        if(homeView) homeView.classList.replace('active-view', 'hidden-view');
        if(savedIdeasView) savedIdeasView.classList.replace('active-view', 'hidden-view');
        if(pinDetailView) pinDetailView.classList.replace('active-view', 'hidden-view');
        
        const targetEl = document.getElementById(targetSectionId);
        if(targetEl) targetEl.classList.replace('hidden-view', 'active-view');

        navInicio?.classList.remove('active');
        navTableros?.classList.remove('active');
        
        if (targetSectionId === 'home-view') navInicio?.classList.add('active');
        else if (targetSectionId === 'saved-ideas-view') navTableros?.classList.add('active');
    }

    navInicio?.addEventListener('click', () => switchToSection('home-view'));
    navTableros?.addEventListener('click', () => switchToSection('saved-ideas-view'));
    document.getElementById('explore-pines-btn')?.addEventListener('click', () => switchToSection('home-view'));
    document.getElementById('btn-back-home')?.addEventListener('click', () => switchToSection('home-view'));

    function switchToTab(targetTabId) {
        tabContents.forEach(content => content.classList.replace('active-tab-view', 'hidden-tab-view'));
        tabButtons.forEach(btn => btn.classList.remove('active'));
        const targetEl = document.getElementById(targetTabId);
        if(targetEl) targetEl.classList.replace('hidden-tab-view', 'active-tab-view');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchToTab(button.getAttribute('data-target'));
            button.classList.add('active');
        });
    });

    const profileTabButtons = document.querySelectorAll('.profile-nav-tabs .nav-link');
    const profileTabContents = document.querySelectorAll('.profile-tab-content-view');

    if (profileTabButtons.length > 0) {
        profileTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                profileTabContents.forEach(content => content.classList.add('d-none'));
                profileTabButtons.forEach(btn => btn.classList.remove('active'));
                const targetId = button.getAttribute('data-target');
                document.getElementById(targetId).classList.remove('d-none');
                button.classList.add('active');
            });
        });
    }

    function toggleDropdown(element) { element.classList.toggle('d-none'); }
    document.addEventListener('click', (e) => {
        if (shareProfileBtn && !shareProfileBtn.contains(e.target) && !shareMenu?.contains(e.target)) shareMenu?.classList.add('d-none');
        if (savedCrearBtn && !savedCrearBtn.contains(e.target) && !savedCrearMenu?.contains(e.target)) savedCrearMenu?.classList.add('d-none');
    });
    if (shareProfileBtn) shareProfileBtn.addEventListener('click', () => toggleDropdown(shareMenu));
    if (savedCrearBtn) savedCrearBtn.addEventListener('click', () => toggleDropdown(savedCrearMenu));

    document.querySelectorAll('.trigger-modal-pin, .option-crear-pin, #btn-profile-crear-pin').forEach(btn => {
        btn.addEventListener('click', () => { if(createPinModal) createPinModal.show(); closeSidebar(); });
    });
    document.querySelectorAll('.trigger-modal-tablero, .option-crear-tablero, #empty-state-crear-tablero').forEach(btn => {
        btn.addEventListener('click', () => { if(createTableroModal) createTableroModal.show(); closeSidebar(); });
    });
    document.querySelectorAll('.trigger-modal-collage, .option-crear-collage, #empty-state-crear-collage').forEach(btn => {
        btn.addEventListener('click', () => { if(createCollageModal) createCollageModal.show(); closeSidebar(); });
    });

    function addPinToProfile(imageUrl) {
        if(pinsEmptyState) pinsEmptyState.classList.add('d-none');
        if(savedPinsGrid) {
            savedPinsGrid.classList.remove('d-none');
            const savedPin = document.createElement('div');
            savedPin.classList.add('pin');
            savedPin.innerHTML = `<img src="${imageUrl}"><button class="pin-edit-btn"><i class="bi bi-pencil-fill"></i></button>`;
            
            savedPin.querySelector('.pin-edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                currentEditingPinElement = savedPin;
                if(document.getElementById('edit-pin-preview')) document.getElementById('edit-pin-preview').src = imageUrl;
                if(editPinModal) editPinModal.show();
            });
            savedPinsGrid.prepend(savedPin);
        }
    }

    function openPinDetail(imageUrl, authorName) {
        if(!pinDetailView) return;
        document.getElementById('detail-main-image').src = imageUrl;
        document.getElementById('detail-author-name').innerText = authorName || "Creador Visual";
        switchToSection('pin-detail-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if(relatedPinsContainer) fetchPins(relatedPinsContainer, 'general', 15);
    }

    const fileInput = document.getElementById('local-file-upload');
    const dropzonePlaceholder = document.getElementById('upload-placeholder-content');
    let uploadedImageSrc = null;

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    uploadedImageSrc = event.target.result;
                    if(dropzonePlaceholder) dropzonePlaceholder.innerHTML = `<img src="${uploadedImageSrc}" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    document.getElementById('publish-new-pin-btn')?.addEventListener('click', () => {
        if (uploadedImageSrc) {
            addPinToProfile(uploadedImageSrc);
            if(createPinModal) createPinModal.hide();
            
            if(document.getElementById('saved-ideas-view')) {
                switchToSection('saved-ideas-view');
                switchToTab('pins-tab-content');
            } else {
                document.querySelector('[data-target="creados-tab-content"]')?.click();
            }

            uploadedImageSrc = null;
            if(document.getElementById('new-pin-title')) document.getElementById('new-pin-title').value = '';
            if(dropzonePlaceholder) dropzonePlaceholder.innerHTML = `<div class="upload-icon-wrapper rounded-circle bg-dark text-white d-flex justify-content-center align-items-center mb-3" style="width: 40px; height: 40px;"><i class="bi bi-arrow-up fw-bold fs-5"></i></div><p class="fw-semibold text-dark m-0 px-4">Elige un archivo o arrástralo y colócalo aquí</p>`;
        }
    });

    document.getElementById('confirm-delete-btn')?.addEventListener('click', () => {
        if (currentEditingPinElement) {
            currentEditingPinElement.remove();
            currentEditingPinElement = null;
            if (savedPinsGrid && savedPinsGrid.children.length === 0) {
                savedPinsGrid.classList.add('d-none');
                if(pinsEmptyState) pinsEmptyState.classList.remove('d-none');
            }
        }
    });


    document.getElementById('publish-new-board-btn')?.addEventListener('click', () => {
        const boardName = document.getElementById('new-board-name').value || 'Mi Tablero';
        if(tablerosEmptyState) tablerosEmptyState.classList.add('d-none');
        if(savedBoardsGrid) {
            savedBoardsGrid.classList.remove('d-none');
            const boardEl = document.createElement('div');
            boardEl.classList.add('cursor-pointer');
            boardEl.innerHTML = `
                <div class="d-flex flex-column gap-2 mb-3">
                    <div class="d-flex gap-1 hover-zoom">
                        <div class="bg-light rounded-start-4" style="width: 160px; height: 160px; background-color: #e9ecef !important;"></div>
                        <div class="d-flex flex-column gap-1">
                            <div class="bg-light rounded-end-4" style="width: 80px; height: 79px; background-color: #e9ecef !important;"></div>
                            <div class="bg-light rounded-end-4" style="width: 80px; height: 79px; background-color: #e9ecef !important;"></div>
                        </div>
                    </div>
                    <span class="fw-bold text-dark fs-5 ps-1">${boardName}</span>
                </div>
            `;
            savedBoardsGrid.prepend(boardEl);
        }
        if(createTableroModal) createTableroModal.hide();
        switchToSection('saved-ideas-view');
        switchToTab('tableros-tab-content');
        if(document.getElementById('new-board-name')) document.getElementById('new-board-name').value = '';
    });

    // Lógica do Canvas (Collage)
    const collageEditorView = document.getElementById('collage-editor-view');
    const collagePublishView = document.getElementById('collage-publish-view');
    const btnNextCollage = document.getElementById('btn-next-collage');
    const interactiveCanvas = document.getElementById('interactive-canvas');
    let collageItemsCount = 0;

    function addImageToCollage(src) {
        collageItemsCount++;
        const item = document.createElement('div');
        item.classList.add('position-absolute', 'collage-item', 'selected', 'cursor-pointer');
        item.style.top = `${Math.random() * 40}%`;
        item.style.left = `${Math.random() * 40}%`;
        item.style.width = '150px';
        item.innerHTML = `<img src="${src}" class="w-100 rounded-3 shadow-sm"><div class="collage-item-menu position-absolute px-3 py-2 gap-3 shadow"><i class="bi bi-copy text-white fs-6"></i><i class="bi bi-trash3 text-white fs-6 btn-delete-layer"></i><i class="bi bi-scissors text-white fs-6"></i></div>`;

        item.querySelector('.btn-delete-layer').addEventListener('click', (e) => {
            e.stopPropagation(); item.remove(); collageItemsCount--; checkCanvasState();
        });
        item.addEventListener('click', () => {
            document.querySelectorAll('.collage-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
        if(interactiveCanvas) interactiveCanvas.appendChild(item);
        checkCanvasState();
    }

    function checkCanvasState() {
        if(!btnNextCollage) return;
        if (collageItemsCount > 0) {
            btnNextCollage.removeAttribute('disabled');
            btnNextCollage.classList.replace('text-dark', 'text-white');
            btnNextCollage.style.backgroundColor = '#E60023';
        } else {
            btnNextCollage.setAttribute('disabled', 'true');
            btnNextCollage.classList.replace('text-white', 'text-dark');
            btnNextCollage.style.backgroundColor = '#efefef';
        }
    }

    btnNextCollage?.addEventListener('click', () => {
        collageEditorView.classList.replace('d-flex', 'd-none');
        collagePublishView.classList.replace('d-none', 'd-flex');
        if(document.getElementById('collage-final-preview') && interactiveCanvas) {
            document.getElementById('collage-final-preview').innerHTML = interactiveCanvas.innerHTML;
        }
    });

    document.getElementById('btn-back-collage')?.addEventListener('click', () => {
        collagePublishView.classList.replace('d-flex', 'd-none');
        collageEditorView.classList.replace('d-none', 'd-flex');
    });

    document.getElementById('publish-final-collage-btn')?.addEventListener('click', () => {
        if(collagesPublishedState) collagesPublishedState.classList.add('d-none');
        if(publishedCollagesGrid) {
            publishedCollagesGrid.classList.remove('d-none');
            const countEl = document.getElementById('published-collage-count');
            if(countEl) countEl.innerText = parseInt(countEl.innerText) + 1;

            const published = document.createElement('div');
            published.classList.add('pin');
            published.innerHTML = `<div style="background-color:#f9f9f9; width:100%; height:300px; border-radius:16px; overflow:hidden; position:relative;">${document.getElementById('collage-final-preview').innerHTML}</div>`;
            publishedCollagesGrid.prepend(published);
        }
        
        if(interactiveCanvas) interactiveCanvas.innerHTML = '';
        collageItemsCount = 0;
        checkCanvasState();
        if(createCollageModal) createCollageModal.hide();
        collagePublishView?.classList.replace('d-flex', 'd-none');
        collageEditorView?.classList.replace('d-none', 'd-flex');
        
        switchToSection('saved-ideas-view');
        switchToTab('collages-tab-content');
    });


    async function fetchPins(container, type = 'feed', limit = 30) {
        if(!container) return;
        try {
            const apiKey = '55734665-a9890c2e2ed5d45d706365445'; 
            let termoBusca = 'aesthetic design Kawaii'; 
            if (type === 'collage') termoBusca = 'stickers aesthetic png';
            if (type === 'general') termoBusca = 'inspiration photography';

            const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(termoBusca)}&image_type=photo&per_page=${limit}`);
            const data = await response.json();
            
            container.innerHTML = ''; 
            data.hits.forEach(image => {
                const element = document.createElement('div');
                element.classList.add(type === 'collage' ? 'w-100' : 'pin');
                
                if (type === 'collage') {
                    element.innerHTML = `<img src="${image.webformatURL}" class="w-100 rounded-3 mb-2 cursor-pointer shadow-sm">`;
                    element.querySelector('img').addEventListener('click', () => addImageToCollage(image.webformatURL));
                } else {
                    element.innerHTML = `<img src="${image.webformatURL}" class="cursor-pointer"><button class="pin-save-btn">Guardar</button>`;
                    element.querySelector('img').addEventListener('click', () => openPinDetail(image.largeImageURL || image.webformatURL, image.user));
                    const saveBtn = element.querySelector('.pin-save-btn');
                    saveBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if(!saveBtn.classList.contains('saved')) {
                            saveBtn.classList.add('saved');
                            saveBtn.innerText = 'Guardado';
                            addPinToProfile(image.webformatURL); 
                        }
                    });
                }
                container.appendChild(element);
            });
        } catch (error) {
            console.error('Erro API:', error);
        }
    }

    if(pinContainer) fetchPins(pinContainer, 'feed'); 
    if(document.getElementById('collage-inspiration-grid')) fetchPins(document.getElementById('collage-inspiration-grid'), 'collage', 12); 

});