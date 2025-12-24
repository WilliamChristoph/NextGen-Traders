// ==================== NEXTGEN TRADERS - SIMPLE SYSTEM ====================

console.log('🚀 NEXTGEN TRADERS - SIMPLE SYSTEM LOADED');

class SimpleMembershipSystem {
    constructor() {
        this.currentOrder = null;
        this.timer = null;
        this.init();
    }
    
    init() {
        console.log('🔧 Initializing Simple Membership System...');
        this.setupForm();
        this.setupModal();
        console.log('✅ Simple System Ready');
    }
    
    setupForm() {
        const form = document.getElementById('membershipForm');
        const submitBtn = document.getElementById('submitBtn');
        
        if (!form || !submitBtn) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!this.validateForm()) {
                alert('❌ Harap isi semua field dengan benar');
                return;
            }
            
            const formData = this.getFormData();
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            submitBtn.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                this.currentOrder = {
                    order_id: 'NEXTGEN-' + Date.now(),
                    access_code: 'VIP-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
                    ...formData,
                    status: 'pending'
                };
                
                this.showQRISModal(this.currentOrder);
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Terdaftar';
                submitBtn.disabled = false;
            }, 1500);
        });
        
        this.setupValidation();
    }
    
    setupValidation() {
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        
        // Format phone
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.substring(0, 4) + '-' + value.substring(4);
            if (value.length > 9) value = value.substring(0, 9) + '-' + value.substring(9, 13);
            e.target.value = value;
        });
        
        // Email validation
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !pattern.test(email)) {
                this.showFieldError(emailInput, 'Format email tidak valid');
            } else {
                this.clearFieldError(emailInput);
            }
        });
    }
    
    validateForm() {
        const inputs = document.querySelectorAll('#membershipForm input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'Field ini wajib diisi');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });
        
        return isValid;
    }
    
    getFormData() {
        return {
            full_name: document.getElementById('fullName').value.trim(),
            discord_username: document.getElementById('discordUsername').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.replace(/\D/g, '').trim()
        };
    }
    
    showQRISModal(orderData) {
        const modal = document.getElementById('qrisModal');
        const qrisImage = document.getElementById('realQris');
        const orderIdText = document.getElementById('orderIdText');
        const accessCodeText = document.getElementById('accessCodeText');
        
        if (!modal || !qrisImage) return;
        
        if (orderIdText) orderIdText.textContent = orderData.order_id;
        if (accessCodeText) accessCodeText.textContent = orderData.access_code;
        
        // Generate simple QRIS
        const qrData = `NEXTGEN:${orderData.order_id}:500000`;
        qrisImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}&format=png&color=00ff41&bgcolor=0a0a0a`;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.startPaymentTimer();
    }
    
    startPaymentTimer() {
        let timeLeft = 15 * 60; // 15 minutes
        const timerElement = document.getElementById('paymentTimer');
        
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            timeLeft--;
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (timeLeft <= 0) {
                clearInterval(this.timer);
                alert('⏰ Waktu pembayaran habis');
            }
        }, 1000);
    }
    
    setupModal() {
        const closeModal = document.getElementById('closeModal');
        const confirmPayment = document.getElementById('confirmPayment');
        const cancelPayment = document.getElementById('cancelPayment');
        const modal = document.getElementById('qrisModal');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }
        
        if (confirmPayment) {
            confirmPayment.addEventListener('click', () => this.confirmPayment());
        }
        
        if (cancelPayment) {
            cancelPayment.addEventListener('click', () => this.closeModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }
    
    closeModal() {
        const modal = document.getElementById('qrisModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (this.timer) clearInterval(this.timer);
    }
    
    confirmPayment() {
        const confirmBtn = document.getElementById('confirmPayment');
        if (!confirmBtn) return;
        
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memverifikasi...';
        confirmBtn.disabled = true;
        
        setTimeout(() => {
            alert('✅ Pembayaran berhasil dikonfirmasi! Admin akan menghubungi Anda via WhatsApp.');
            confirmBtn.innerHTML = '<i class="fas fa-check"></i> Terverifikasi';
            this.closeModal();
        }, 2000);
    }
    
    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = `
            color: #ff3333;
            font-size: 0.8rem;
            margin-top: 5px;
        `;
        
        input.style.borderColor = '#ff3333';
        input.parentNode.appendChild(error);
    }
    
    clearFieldError(input) {
        const error = input.parentNode.querySelector('.field-error');
        if (error) error.remove();
        input.style.borderColor = '';
    }
}

// Initialize system
document.addEventListener('DOMContentLoaded', () => {
    window.membershipSystem = new SimpleMembershipSystem();
    console.log('🌟 NextGen Traders - SIMPLE SYSTEM ACTIVE');
});