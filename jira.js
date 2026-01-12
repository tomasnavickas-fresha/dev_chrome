(function() {
    const COPY_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    const CHECK_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00875A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    const BRANCH_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>`;

    const formatBranchName = (ticketKey, summary) => {
        const sanitized = summary
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 50)
            .replace(/_+$/, '');
        return `feature/${ticketKey}_${sanitized}`;
    };

    // Inject Styles for a native "Subtle" button look
    const style = document.createElement('style');
    style.innerHTML = `
        .gh-copy-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            background: transparent;
            border: 1px solid #DFE1E6;
            border-radius: 3px;
            padding: 4px 8px;
            margin-left: 6px;
            cursor: pointer;
            color: #42526E;
            font-size: 11px;
            font-weight: 500;
            transition: background 0.1s;
            vertical-align: middle;
        }
        .gh-copy-btn:hover {
            background: rgba(9, 30, 66, 0.08);
            color: #0052CC;
        }
        .gh-copy-btn.success {
            background: #E3FCEF;
        }
    `;
    document.head.appendChild(style);

    const addCopyButtons = () => {
        const cards = document.querySelectorAll('[data-testid="platform-board-kit.ui.card.card"]');

        cards.forEach(card => {
            if (card.querySelector('.gh-branch-btn')) return;

            const keyContainer = card.querySelector('[data-testid="platform-card.common.ui.key.key"]');
            const summaryEl = card.querySelector('.yse7za_summary');

            if (keyContainer && summaryEl) {
                const ticketKey = keyContainer.innerText.trim();
                const summary = summaryEl.innerText.replace('🤖', '').trim();
                const prTitle = `[${ticketKey}] ${summary}`;

                const btn = document.createElement('button');
                btn.className = 'gh-copy-btn';
                btn.setAttribute('title', 'Copy PR Title');
                btn.innerHTML = `${COPY_ICON} Copy Title`;

                btn.onclick = (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(prTitle).then(() => {
                        btn.innerHTML = `${CHECK_ICON} Copied!`;
                        btn.classList.add('success');
                        setTimeout(() => {
                            btn.innerHTML = `${COPY_ICON} Copy Title`;
                            btn.classList.remove('success');
                        }, 1500);
                    });
                };

                // Branch name button
                const branchName = formatBranchName(ticketKey, summary);
                const branchBtn = document.createElement('button');
                branchBtn.className = 'gh-copy-btn gh-branch-btn';
                branchBtn.setAttribute('title', 'Copy Branch Name');
                branchBtn.innerHTML = `${BRANCH_ICON} Branch`;

                branchBtn.onclick = (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(branchName).then(() => {
                        branchBtn.innerHTML = `${CHECK_ICON} Copied!`;
                        branchBtn.classList.add('success');
                        setTimeout(() => {
                            branchBtn.innerHTML = `${BRANCH_ICON} Branch`;
                            branchBtn.classList.remove('success');
                        }, 1500);
                    });
                };

                // Append next to the Ticket Key (e.g. B2C-1234)
                keyContainer.parentElement.appendChild(btn);
                keyContainer.parentElement.appendChild(branchBtn);
            }
        });
    };

    // Initialize
    addCopyButtons();
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    console.log("Subtle Copy Buttons Active.");
})();
