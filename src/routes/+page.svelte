<script>
    import { getTools } from '$lib/data/tools';
    
    const tools = getTools();
    
    let name = '';
    let email = '';
    let idea = '';
    let isSubmitting = false;
    let message = '';
    let isSuccess = false;
  
    async function handleSubmit() {
      if (!idea.trim()) return;
      
      isSubmitting = true;
      message = '';
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name,
            email,
            idea
          })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          isSuccess = true;
          message = result.message || 'Thanks for your suggestion! We\'ll review it soon.';
          // Reset form
          name = '';
          email = '';
          idea = '';
        } else {
          throw new Error(result.error || 'Failed to send message');
        }
      } catch (error) {
        isSuccess = false;
        message = 'Something went wrong. Please try again.';
      } finally {
        isSubmitting = false;
      }
    }
  </script>
  
  <style>
    .contact-section {
      max-width: 800px;
      margin: var(--space-xl) auto;
      padding: 0 var(--space-md);
      text-align: center;
    }
  
    .contact-section h2 {
      margin-bottom: var(--space-sm);
    }
  
    .contact-section > p {
      color: var(--color-text-secondary);
      margin-bottom: var(--space-xl);
    }
  
    .contact-form {
      background: var(--color-surface);
      padding: var(--space-xl);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      text-align: left;
    }
  
    .form-group {
      margin-bottom: var(--space-lg);
    }
  
    .form-group label {
      display: block;
      margin-bottom: var(--space-xs);
      font-weight: 500;
    }
  
    .required {
      color: #ef4444;
    }
  
    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: var(--color-background);
      color: var(--color-text);
      font-family: inherit;
      font-size: 1rem;
    }
  
    .contact-form textarea {
      min-height: 120px;
      resize: vertical;
    }
  
    .contact-form button[type="submit"] {
      width: 100%;
      margin-top: var(--space-md);
    }
  
    .message {
      margin-top: var(--space-lg);
      padding: var(--space-md);
      border-radius: var(--radius-sm);
      font-weight: 500;
    }
  
    .message-success {
      background-color: rgba(74, 222, 128, 0.1);
      color: #22c55e;
      border: 1px solid rgba(74, 222, 128, 0.2);
    }
  
    .message-error {
      background-color: rgba(248, 113, 113, 0.1);
      color: #ef4444;
      border: 1px solid rgba(248, 113, 113, 0.2);
    }
  
    @media (max-width: 768px) {
      .contact-form {
        padding: var(--space-lg) var(--space-md);
      }
    }

    .hero {
    text-align: center;
    margin-bottom: var(--space-xl);
    padding: var(--space-xl) 0;
  }

  .hero h1 {
    font-size: 3rem;
    margin-bottom: var(--space-sm);
    background: linear-gradient(90deg, #646CFF, #9C27B0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    margin-bottom: 0;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: var(--space-xl);
    margin: 0 auto;
    max-width: 1400px;
    padding: 0 var(--space-md);
  }

  .tool-card {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--color-border);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .tool-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .preview-container {
    position: relative;
    overflow: hidden;
    background: #1a1a1a;
    border-bottom: 1px solid var(--color-border);
  }

  .tool-preview {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  .tool-card:hover .tool-preview {
    transform: scale(1.02);
  }

  .coming-soon {
    position: relative;
    background: linear-gradient(45deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%);
    background-size: 200% 200%;
    animation: shimmer 2s infinite linear;
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .coming-soon-badge {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-sm);
    background: var(--accent-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    z-index: 1;
  }

  .empty-preview {
    color: var(--color-text-secondary);
    text-align: center;
    padding: var(--space-xl);
  }

  .empty-preview svg {
    width: 4rem;
    height: 4rem;
    opacity: 0.5;
    margin-bottom: var(--space-sm);
  }

  .tool-content {
    padding: var(--space-lg);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .tool-content h2 {
    color: var(--color-text);
    margin-bottom: var(--space-sm);
    font-size: 1.5rem;
  }

  .tool-content p {
    color: var(--color-text-secondary);
    flex: 1;
    margin-bottom: var(--space-lg);
  }

  .tool-actions {
    margin-top: auto;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .tools-grid {
      grid-template-columns: 1fr;
      padding: 0 var(--space-md);
    }
    
    .hero h1 {
      font-size: 2.25rem;
    }
  }
  .contact-section {
    max-width: 800px;
    margin: var(--space-xl) auto;
    padding: 0 var(--space-md);
    text-align: center;
  }

  .contact-section h2 {
    margin-bottom: var(--space-sm);
  }

  .contact-section > p {
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xl);
  }

  .contact-form {
    background: var(--color-surface);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    text-align: left;
  }

  .form-group {
    margin-bottom: var(--space-lg);
  }

  .form-group label {
    display: block;
    margin-bottom: var(--space-xs);
    font-weight: 500;
  }

  .required {
    color: #ef4444;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    background: var(--color-background);
    color: var(--color-text);
    font-family: inherit;
    font-size: 1rem;
  }

  .contact-form textarea {
    min-height: 120px;
    resize: vertical;
  }

  .contact-form button[type="submit"] {
    width: 100%;
    margin-top: var(--space-md);
  }

  .message {
    margin-top: var(--space-lg);
    padding: var(--space-md);
    border-radius: var(--radius-sm);
    font-weight: 500;
  }

  .message-success {
    background-color: rgba(74, 222, 128, 0.1);
    color: #22c55e;
    border: 1px solid rgba(74, 222, 128, 0.2);
  }

  .message-error {
    background-color: rgba(248, 113, 113, 0.1);
    color: #ef4444;
    border: 1px solid rgba(248, 113, 113, 0.2);
  }

  @media (max-width: 768px) {
    .contact-form {
      padding: var(--space-lg) var(--space-md);
    }
  }
</style>

<div class="hero">
  <h1>Chronokl</h1>
  <p class="subtitle">Useful tools for the web</p>
</div>

<div class="tools-grid">
  {#each tools as tool}
    <div class="tool-card" style="--accent-color: {tool.accentColor}">
      {#if tool.preview}
        <div class="preview-container">
          <img 
            src={tool.preview} 
            alt={`${tool.title} preview`} 
            class="tool-preview"
            loading="lazy"
          />
        </div>
      {:else}
        <div class="coming-soon">
          <div class="coming-soon-badge">Coming Soon</div>
          <div class="empty-preview">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>
      {/if}
      
      <div class="tool-content">
        <h2>{tool.title}</h2>
        <p>{tool.description}</p>
        <div class="tool-actions">
          {#if tool.comingSoon}
            <button class="btn" disabled>Coming Soon</button>
          {:else}
            <a href={tool.url} class="btn btn-primary">Open {tool.title}</a>
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>
<hr style="margin: var(--space-xl) 0;">
<div class="contact-section">
    <h2>Got a tool idea?</h2>
    <p>Suggest a new tool or feature you'd like to see on Chronokl</p>
    
    <form class="contact-form" on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="name">Your Name (optional)</label>
        <input 
          type="text" 
          id="name" 
          bind:value={name} 
          placeholder="John Doe"
        >
      </div>
      
      <div class="form-group">
        <label for="email">Email (optional)</label>
        <input 
          type="email" 
          id="email" 
          bind:value={email} 
          placeholder="your@email.com"
        >
      </div>
      
      <div class="form-group">
        <label for="idea">Your Idea <span class="required">*</span></label>
        <textarea 
          id="idea" 
          bind:value={idea} 
          required 
          placeholder="Describe the tool or feature you'd like to see..."
          rows="4"
        ></textarea>
      </div>
      
      <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit Idea'}
      </button>
      
      {#if message}
        <div class:message-success={isSuccess} class:message-error={!isSuccess} class="message">
          {message}
        </div>
      {/if}
    </form>
  </div>