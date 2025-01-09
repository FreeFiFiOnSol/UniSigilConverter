document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const translateBtn = document.getElementById('translateBtn');

    function translate() {
        let inputText = input.value.trim();
        
        if (!inputText) {
            output.textContent = '✧ Awaiting your input... ✧';
            return;
        }

        // Check if input is a single symbol/sigil
        if (inputText.length === 1 || isEmojiSymbol(inputText)) {
            // Convert symbol to Unicode
            const codePoint = inputText.codePointAt(0);
            output.textContent = `U+${codePoint.toString(16).toUpperCase()}`;
            addMagicalEffect(output);
        } else {
            // Convert Unicode to symbol
            inputText = inputText.replace(/^U\+|^U/i, ''); // Remove U+ prefix if present
            
            try {
                const codePoint = parseInt(inputText, 16);
                const result = String.fromCodePoint(codePoint);
                output.textContent = result;
                addMagicalEffect(output);
            } catch (error) {
                output.textContent = '✧ Invalid mystical sequence ✧';
                console.error('Translation error:', error);
            }
        }
    }

    function isEmojiSymbol(str) {
        return Array.from(str).length === 1;
    }

    function addMagicalEffect(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'magicalGlow 1s ease-in-out';
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showCopyNotification();
        } catch (err) {
            console.error('Failed to copy:', err);
            showCopyNotification('✧ Failed to capture the essence ✧');
        }
    }

    function showCopyNotification(message = '✧ Essence captured! ✧') {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Event Listeners
    translateBtn.addEventListener('click', translate);

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            translate();
        }
    });

    output.addEventListener('click', async function() {
        const text = output.textContent;
        if (text && !text.includes('Awaiting') && !text.includes('Invalid')) {
            await copyToClipboard(text);
        }
    });

    // Add this CSS for the magical glow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes magicalGlow {
            0% { text-shadow: 0 0 10px var(--text-glow); }
            50% { text-shadow: 0 0 20px var(--crystal-glow), 0 0 30px var(--crystal-glow); }
            100% { text-shadow: 0 0 10px var(--text-glow); }
        }
    `;
    document.head.appendChild(style);
});
