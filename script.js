const card = document.getElementById('card');
const cardText = document.getElementById('cardText');
const cardSignature = document.getElementById('cardSignature');
const bgColorInput = document.getElementById('bgColor');
const borderColorInput = document.getElementById('borderColor');
const textContentInput = document.getElementById('textContent');
const charCount = document.getElementById('charCount');
const showTextInput = document.getElementById('showText');
const textColorInput = document.getElementById('textColor');
const signatureInput = document.getElementById('signature');
const fontStyleInput = document.getElementById('fontStyle');
const cardWidthInput = document.getElementById('cardWidth');
const cardPositionInput = document.getElementById('cardPosition');
const cardImageInput = document.getElementById('cardImage');
const removeImageButton = document.getElementById('removeImage');
let cardImageElement = null;
const maxChars = 50;
const maxSignatureChars = 15;

function updateCard() {
    card.style.backgroundColor = bgColorInput.value;
    card.style.borderColor = borderColorInput.value;
    cardText.style.color = textColorInput.value;

    if (showTextInput.checked) {
        cardText.textContent = textContentInput.value || 'Texto de Exemplo';
        cardText.style.display = 'block';
    } else {
        cardText.style.display = 'none';
    }

    cardSignature.textContent = signatureInput.value;
    cardSignature.style.display = signatureInput.value ? 'block' : 'none';
    cardSignature.style.color = textColorInput.value;

    cardText.style.fontFamily = fontStyleInput.value;
    cardSignature.style.fontFamily = fontStyleInput.value;

    card.style.width = cardWidthInput.value + 'px';

    switch (cardPositionInput.value) {
        case 'left':
            card.style.marginLeft = '0';
            card.style.marginRight = 'auto';
            break;
        case 'center':
            card.style.marginLeft = 'auto';
            card.style.marginRight = 'auto';
            break;
        case 'right':
            card.style.marginLeft = 'auto';
            card.style.marginRight = '0';
            break;
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (!cardImageElement) {
                cardImageElement = document.createElement('img');
                card.appendChild(cardImageElement);
            }
            cardImageElement.src = e.target.result;
            cardImageElement.style.display = 'block';
            cardText.style.display = showTextInput.checked ? 'block' : 'none';
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    if (cardImageElement) {
        card.removeChild(cardImageElement);
        cardImageElement = null;
        cardImageInput.value = '';
        cardText.style.display = showTextInput.checked ? 'block' : 'none';
    }
}

function updateCharCount() {
    let remainingTextChars = maxChars - textContentInput.value.length;
    let remainingSignatureChars = maxSignatureChars - signatureInput.value.length;
    
    remainingTextChars = Math.max(0, remainingTextChars);
    remainingSignatureChars = Math.max(0, remainingSignatureChars);

    charCount.textContent = `Restam ${remainingTextChars} caracteres para o texto e ${remainingSignatureChars} caracteres para a assinatura.`;
   
    if (textContentInput.value.length > maxChars) {
        textContentInput.value = textContentInput.value.substring(0, maxChars);
    }
    
    if (signatureInput.value.length > maxSignatureChars) {
        signatureInput.value = signatureInput.value.substring(0, maxSignatureChars);
    }
}

bgColorInput.addEventListener('input', updateCard);
borderColorInput.addEventListener('input', updateCard);
textContentInput.addEventListener('input', () => {
    updateCard();
    updateCharCount();
});
showTextInput.addEventListener('change', updateCard);
textColorInput.addEventListener('input', updateCard);
signatureInput.addEventListener('input', () => {
    updateCard();
    updateCharCount();
});
fontStyleInput.addEventListener('change', updateCard);
cardWidthInput.addEventListener('input', updateCard);
cardPositionInput.addEventListener('change', updateCard);
cardImageInput.addEventListener('change', handleImageUpload);
removeImageButton.addEventListener('click', removeImage);

updateCard();
updateCharCount();
