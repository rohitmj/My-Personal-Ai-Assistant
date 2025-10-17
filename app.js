
    // 0. Initialize Gemini API connection (The factory Command)
    const ai = new GoogleGenAI ({ apiKey: "YOUR_API_KEY_HERE"});


    const input = document.getElementById('chat-input');
    const button = document.getElementById('send-button');
    const messageArea = document.querySelector('.chat-messages-area');

  
    // --- Core Functionality ---

    // 1. Initial State
    button.disabled = true;

    // 2. Input Event Listener (Handles Auto-Resize and Button State)
    input.addEventListener('input' , () => {
        // Auto-Resize Logic: Reset height, then set to scrollHeight
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';

        // Button Disable Logic: Enable only if there's non-whitespace content
        const hasContent = input.value.trim().length > 0;
        button.disabled = !hasContent;

    });

    // 3. Keydown Event Listener (Handles Enter-to-Send)
      input.addEventListener('keydown', (event) => {
        // Check if the Enter key was pressed AND the Shift key was NOT pressed 
        if(event.key === 'Enter' && !event.shiftKey){
          event.preventDefault(); // <-- THIS IS CRUCIAL: Prevents the default "new line" behavior

          if(!button.disabled){
            sendMessage(); // Call the send function if the button is active
          }
        }
      });

      // 4. Click Event Listener (Handles Mouse Clicks)
      button.addEventListener('click', sendMessage);

      // ---Send Message Function ---
      
    async function sendMessage() {
    const message = input.value.trim();
    
    if (message) {
        
        // 1. MESSAGE CREATION & ASSEMBLY
        
        // Create the outer wrapper (div with classes: message-container user-message)
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'user-message');
        
        // Create the inner bubble (div with class: message-bubble)
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        
        // Insert the user's text into the bubble
        messageBubble.textContent = message;

        // Put the Bubble INSIDE the Container
        messageContainer.appendChild(messageBubble);

        
        // 2. MESSAGE DISPLAY & SCROLL
        
        // Put the assembled Container into the main chat area
        messageArea.appendChild(messageContainer);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [message]
        });
        
        // Ensure the chat window scrolls down to the newest message
        messageArea.scrollTop = messageArea.scrollHeight;

        
        // 3. CLEANUP
        
        // Clear and reset the input field and button
        input.value = '';
        input.style.height = 'auto'; 
        button.disabled = true;
    }
}
      



