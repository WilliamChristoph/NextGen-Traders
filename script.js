// ==================== TRADING ASSISTANT & MEMBERSHIP ====================
document.addEventListener('DOMContentLoaded', function () {
  console.log('NextGen Traders initialized');

  // Elements
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const newChatBtn = document.getElementById('newChatBtn');
  const updateTime = document.getElementById('updateTime');
  const quickButtons = document.querySelectorAll('.btn-quick');
  const discordBtn = document.getElementById('discordBtn');
  
  // Membership Elements
  const membershipForm = document.getElementById('membershipForm');
  const qrisModal = document.getElementById('qrisModal');
  const closeModal = document.getElementById('closeModal');
  const confirmPayment = document.getElementById('confirmPayment');
  const cancelPayment = document.getElementById('cancelPayment');
  const paymentTimer = document.getElementById('paymentTimer');
  const realQris = document.getElementById('realQris');

  // ==================== RESPONSE DATABASE ====================
  const responses = {
    "cara mulai trading": {
      response: `
        <p><strong>🔄 Cara Mulai Trading dari Nol:</strong></p>
        <ol>
          <li><strong>Belajar dulu</strong> - Pahami dasar market, jenis order, dan konsep risk/reward</li>
          <li><strong>Pakai akun demo</strong> - Latihan minimal 3 bulan tanpa risiko nyata</li>
          <li><strong>Risk kecil</strong> - Mulai dengan risk 1–2% per trade</li>
          <li><strong>Catat jurnal trading</strong> - Dokumentasikan setiap trade untuk evaluasi</li>
        </ol>
        <p><em>Trading itu skill yang dibangun, bukan judi atau cepat kaya.</em></p>
        <div class="response-tips">
          <p><i class="fas fa-lightbulb"></i> <strong>Tips:</strong> Fokus konsistensi, bukan profit besar di awal.</p>
        </div>
      `,
      delay: 1200
    },

    "modal kecil trading": {
      response: `
        <p><strong>💰 Trading dengan Modal Kecil:</strong></p>
        <ul>
          <li><strong>Fokus 1–2 pair</strong> - Lebih mudah dikontrol dan dianalisa</li>
          <li><strong>Gunakan micro lot</strong> - Risk lebih terkontrol</li>
          <li><strong>Stop loss wajib</strong> - Jangan biarkan loss tak terkendali</li>
          <li><strong>No overtrade</strong> - Quality over quantity</li>
        </ul>
        <p><strong>Goal utama:</strong> bangun konsistensi dulu, baru scale up.</p>
        <div class="response-tips">
          <p><i class="fas fa-lightbulb"></i> <strong>Rekomendasi:</strong> Mulai dengan $100-500, fokus pada pengelolaan, bukan profit besar.</p>
        </div>
      `,
      delay: 1300
    },

    "manajemen risiko": {
      response: `
        <p><strong>🛡️ Inti Risk Management:</strong></p>
        <ul>
          <li><strong>Risk per trade</strong> - Maksimal 2% dari equity</li>
          <li><strong>Risk/Reward ratio</strong> - Minimal 1:2</li>
          <li><strong>Daily loss limit</strong> - Maksimal 5% per hari</li>
          <li><strong>Monthly loss limit</strong> - Maksimal 20% per bulan</li>
        </ul>
        <p><em>Loss adalah biaya bisnis trading, bukan kegagalan.</em></p>
        <div class="response-tips">
          <p><i class="fas fa-calculator"></i> <strong>Formula:</strong> Position Size = (Account Balance × Risk %) / Stop Loss (pips)</p>
        </div>
      `,
      delay: 1400
    },

    "psikologi trading": {
      response: `
        <p><strong>🧠 Psikologi Trading yang Kuat:</strong></p>
        <ul>
          <li><strong>Jangan revenge trade</strong> - Setelah loss, jeda dulu</li>
          <li><strong>Ikuti sistem</strong> - Disiplin pada rules, bukan emosi</li>
          <li><strong>Quality > quantity</strong> - Satu setup bagus lebih baik dari 10 setup biasa</li>
          <li><strong>Loss itu normal</strong> - Accept loss sebagai bagian dari proses</li>
        </ul>
        <p><em>Trader kalah karena emosi, bukan karena market atau sistem.</em></p>
        <div class="response-tips">
          <p><i class="fas fa-brain"></i> <strong>Latihan:</strong> Meditasi 5 menit sebelum trading untuk clear mind.</p>
        </div>
      `,
      delay: 1500
    },

    "analisis teknikal": {
      response: `
        <p><strong>📈 Analisis Teknikal Dasar:</strong></p>
        <ul>
          <li><strong>Trend identification</strong> - HH-HL untuk uptrend, LH-LL untuk downtrend</li>
          <li><strong>Support & Resistance</strong> - Area harga penting untuk entry dan exit</li>
          <li><strong>Market structure</strong> - Pahami swing high/low dan break of structure</li>
          <li><strong>Entry dengan konfirmasi</strong> - Jangan masuk hanya berdasarkan satu indikator</li>
        </ul>
        <p><strong>Prinsip:</strong> Keep it simple. Lebih banyak indikator ≠ lebih akurat.</p>
        <div class="response-tips">
          <p><i class="fas fa-chart-line"></i> <strong>Setup dasar:</strong> Price Action + 1-2 indikator konfirmasi (RSI/MACD)</p>
        </div>
      `,
      delay: 1600
    },

    "keuangan pribadi": {
      response: `
        <p><strong>💼 Personal Finance untuk Trader:</strong></p>
        <ul>
          <li><strong>50% kebutuhan</strong> - Hidup, tagihan, operasional</li>
          <li><strong>30% keinginan</strong> - Lifestyle, hiburan</li>
          <li><strong>20% tabungan & investasi</strong> - Termasuk modal trading</li>
        </ul>
        <p><strong>Emergency fund wajib</strong> sebelum mulai trading serius.</p>
        <div class="response-tips">
          <p><i class="fas fa-shield-alt"></i> <strong>Safety first:</strong> Jangan trading dengan uang yang Anda tidak rela kehilangan.</p>
        </div>
      `,
      delay: 1500
    },

    "default": {
      response: `
        <p>Pertanyaan diterima. 👌</p>
        <p><strong>Topik yang Anda tanyakan:</strong> "${escapeHtml(userInput.value)}"</p>
        <p>Untuk jawaban yang lebih spesifik, silakan perjelas:</p>
        <ul>
          <li><strong>Market apa?</strong> (Forex / Saham / Crypto / Commodity)</li>
          <li><strong>Timeframe preferensi?</strong> (Scalp / Day trade / Swing)</li>
          <li><strong>Tujuan trading?</strong> (Income tambahan / Full-time / Investasi)</li>
        </ul>
        <p>Saya akan jawab langsung ke inti dengan contoh praktis.</p>
        <div class="response-tips">
          <p><i class="fas fa-question-circle"></i> <strong>Contoh pertanyaan spesifik:</strong> "Bagaimana risk management untuk swing trading crypto?"</p>
        </div>
      `,
      delay: 900
    }
  };

  init();

  // ==================== INITIALIZATION ====================
  function init() {
    updateMarketTime();
    
    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    newChatBtn.addEventListener('click', startNewChat);

    userInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    quickButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        userInput.value = btn.dataset.question;
        sendMessage();
      });
    });

    // Discord Button Action
    if (discordBtn) {
      discordBtn.addEventListener('click', function() {
        // Animation effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
        
        // Add message to AI Assistant
        addMessage(
          'Saya ingin bergabung dengan Discord NextGen Traders!',
          'user'
        );
        
        setTimeout(() => {
          addMessage(
            '🔥 **LINK DISCORD NEXTGEN TRADERS:**\n' +
            '👉 https://discord.gg/nextgen-traders\n\n' +
            '**🎯 APA YANG AKAN ANDA DAPATKAN:**\n' +
            '✅ **Trading Room** live analysis setiap hari\n' +
            '✅ **Market Updates** real-time 24/7\n' +
            '✅ **Mentoring Session** dengan trader berpengalaman\n' +
            '✅ **Resource Library** lengkap (ebook, video, tools)\n' +
            '✅ **Support Community** yang aktif dan membantu\n\n' +
            '**⚠️ PERHATIAN:**\n' +
            '• Pastikan username Discord profesional\n' +
            '• Baca rules channel sebelum posting\n' +
            '• Respect semua member\n\n' +
            'Klik link di atas untuk join sekarang! 🚀',
            'assistant'
          );
          
          // Auto scroll to bottom
          setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }, 100);
        }, 1500);
      });
    }

    // Membership Form Submission
    if (membershipForm) {
      membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const discordUsername = document.getElementById('discordUsername').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Validate form
        if (!fullName || !discordUsername || !email || !phone) {
          alert('Harap isi semua field yang diperlukan');
          return;
        }
        
        // Show success message
        const submitBtn = this.querySelector('.premium-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.disabled = true;
        
        // Simulate processing
        setTimeout(() => {
          // Show QRIS modal
          showQrisModal(fullName, discordUsername, email, phone);
          
          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      });
    }
    
    // Modal Event Listeners
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        qrisModal.classList.remove('active');
        resetPaymentTimer();
      });
    }
    
    if (confirmPayment) {
      confirmPayment.addEventListener('click', () => {
        confirmPaymentProcess();
      });
    }
    
    if (cancelPayment) {
      cancelPayment.addEventListener('click', () => {
        qrisModal.classList.remove('active');
        resetPaymentTimer();
        alert('Pembayaran dibatalkan. Anda dapat mencoba lagi kapan saja.');
      });
    }
    
    // Close modal when clicking outside
    qrisModal.addEventListener('click', (e) => {
      if (e.target === qrisModal) {
        qrisModal.classList.remove('active');
        resetPaymentTimer();
      }
    });

    // Update time every minute
    setInterval(updateMarketTime, 60000);

    // Initial greeting
    setTimeout(() => {
      addMessage(
        'Halo! Saya NextGen AI Assistant. 👋<br>Saya di sini untuk membantu Anda memahami trading, manajemen risiko, dan psikologi trading. Mau bahas apa hari ini?',
        'assistant'
      );
    }, 1000);
    
    // Add some visual effects on load
    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
      });
    }, 500);
    
    // Add scroll animations
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial scroll check
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }

  // ==================== CORE FUNCTIONS ====================
  function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;

    addMessage(msg, 'user');
    userInput.value = '';
    userInput.focus();
    
    // Button click effect
    sendBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      sendBtn.style.transform = '';
    }, 200);
    
    showTyping();

    setTimeout(() => {
      removeTyping();
      addMessage(getResponse(msg), 'assistant');
      
      // Auto-scroll to newest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, getDelay(msg));
  }

  function getResponse(msg) {
    const lower = msg.toLowerCase();

    if (lower.includes('mulai') || lower.includes('awal') || lower.includes('pemula')) 
      return responses["cara mulai trading"].response;
    
    if (lower.includes('modal') || lower.includes('uang') || lower.includes('dana') || lower.includes('kecil')) 
      return responses["modal kecil trading"].response;
    
    if (lower.includes('risk') || lower.includes('manajemen') || lower.includes('resiko') || lower.includes('stop loss')) 
      return responses["manajemen risiko"].response;
    
    if (lower.includes('psikologi') || lower.includes('emosi') || lower.includes('mental') || lower.includes('disiplin')) 
      return responses["psikologi trading"].response;
    
    if (lower.includes('analisis') || lower.includes('teknikal') || lower.includes('chart') || lower.includes('indikator')) 
      return responses["analisis teknikal"].response;
    
    if (lower.includes('keuangan') || lower.includes('finansial') || lower.includes('uang pribadi') || lower.includes('budget')) 
      return responses["keuangan pribadi"].response;

    return responses.default.response.replace('${escapeHtml(userInput.value)}', escapeHtml(msg));
  }

  function getDelay(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('mulai')) return responses["cara mulai trading"].delay;
    if (lower.includes('modal')) return responses["modal kecil trading"].delay;
    if (lower.includes('risk')) return responses["manajemen risiko"].delay;
    if (lower.includes('psikologi')) return responses["psikologi trading"].delay;
    if (lower.includes('analisis')) return responses["analisis teknikal"].delay;
    if (lower.includes('keuangan')) return responses["keuangan pribadi"].delay;
    
    return 900 + Math.random() * 700;
  }

  // ==================== UI FUNCTIONS ====================
  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerHTML = `
      <div class="avatar">${sender === 'user' ? '👤' : '🤖'}</div>
      <div class="content">${text}</div>
    `;
    chatMessages.appendChild(div);
    
    // Add typing animation for assistant messages
    if (sender === 'assistant') {
      div.style.opacity = '0';
      div.style.transform = 'translateY(10px)';
      setTimeout(() => {
        div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
      }, 10);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.id = 'typing';
    div.className = 'message assistant';
    div.innerHTML = `
      <div class="avatar">🤖</div>
      <div class="content">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing');
    if (t) {
      t.style.opacity = '0';
      t.style.transform = 'translateY(-10px)';
      setTimeout(() => t.remove(), 300);
    }
  }

  function startNewChat() {
    // Animation effect
    newChatBtn.style.transform = 'rotate(90deg)';
    setTimeout(() => {
      newChatBtn.style.transform = '';
    }, 300);
    
    // Fade out messages
    const messages = chatMessages.querySelectorAll('.message');
    messages.forEach((msg, index) => {
      msg.style.transition = 'opacity 0.3s ease';
      msg.style.opacity = '0';
      setTimeout(() => {
        chatMessages.innerHTML = '';
        addMessage(
          'Diskusi baru dimulai! 🔄<br>Sekarang kita mulai dari clean slate. Mau bahas topik trading apa?',
          'assistant'
        );
      }, messages.length * 50);
    });
  }

  function updateMarketTime() {
    const now = new Date();
    updateTime.textContent = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    // Update time color based on market hours
    const hour = now.getHours();
    if (hour >= 9 && hour < 17) {
      updateTime.style.color = 'var(--primary)';
    } else {
      updateTime.style.color = '#aaa';
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==================== MEMBERSHIP FUNCTIONS ====================
  function showQrisModal(fullName, discordUsername, email, phone) {
    // Update QRIS with dynamic data
    const paymentData = {
      name: fullName,
      discord: discordUsername,
      email: email,
      phone: phone,
      amount: 500000,
      timestamp: Date.now()
    };
    
    const qrData = `https://nextgentraders.com/payment/${btoa(JSON.stringify(paymentData))}`;
    realQris.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
    
    // Show modal
    qrisModal.classList.add('active');
    
    // Start payment timer
    startPaymentTimer();
    
    // Add message to AI Assistant about membership
    setTimeout(() => {
      addMessage(
        `Saya ingin mendaftar membership premium NextGen Traders!`,
        'user'
      );
      
      setTimeout(() => {
        addMessage(
          `🎉 **PENDAFTARAN MEMBERSHIP DITERIMA!**\n\n` +
          `**Detail Pendaftaran:**\n` +
          `• Nama: ${fullName}\n` +
          `• Discord: ${discordUsername}\n` +
          `• Email: ${email}\n` +
          `• WhatsApp: ${phone}\n\n` +
          `💰 **Langkah selanjutnya:**\n` +
          `1. Lakukan pembayaran Rp 500.000 via QRIS yang muncul\n` +
          `2. Screenshot bukti pembayaran\n` +
          `3. Kirim ke WhatsApp admin untuk verifikasi\n` +
          `4. Akses Discord VIP akan diberikan dalam 1x24 jam\n\n` +
          `Selamat bergabung dengan komunitas elite NextGen Traders! 🚀`,
          'assistant'
        );
      }, 1000);
    }, 500);
  }

  let timerInterval;
  function startPaymentTimer() {
    let timeLeft = 15 * 60; // 15 minutes in seconds
    
    timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      
      paymentTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        qrisModal.classList.remove('active');
        alert('Waktu pembayaran telah habis. Silakan submit form ulang untuk mendapatkan QRIS baru.');
      }
      
      timeLeft--;
    }, 1000);
  }

  function resetPaymentTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    paymentTimer.textContent = '15:00';
  }

  function confirmPaymentProcess() {
    const confirmBtn = confirmPayment;
    const originalText = confirmBtn.innerHTML;
    
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    confirmBtn.disabled = true;
    
    // Simulate verification process
    setTimeout(() => {
      // Show success message
      alert('✅ Pembayaran berhasil dikonfirmasi!\n\nAdmin akan menghubungi Anda via WhatsApp/Email untuk memberikan akses Discord VIP dalam 1x24 jam.\n\nTerima kasih telah bergabung dengan NextGen Traders Premium!');
      
      // Close modal
      qrisModal.classList.remove('active');
      resetPaymentTimer();
      
      // Reset form
      membershipForm.reset();
      
      // Reset button
      confirmBtn.innerHTML = originalText;
      confirmBtn.disabled = false;
    }, 2000);
  }

  // ==================== ADDITIONAL EFFECTS ====================
  
  // Handle scroll animations
  function handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in:not(.animated)');
    fadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('animated');
        el.style.animationPlayState = 'running';
      }
    });
  }
});