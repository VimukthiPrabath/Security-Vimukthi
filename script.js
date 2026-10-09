/**
 * ==========================================================
 * CYBERSECURITY PORTFOLIO - JAVASCRIPT LOGIC
 * Features:
 * - Matrix Rain Background Canvas
 * - Terminal Command Line Simulator (Blue Team & Defensive focus)
 * - Typewriter Text Engine (Defensive Security & SOC Analyst)
 * - Dynamic Stat Counters on Scroll
 * - Mobile Menu & Smooth Interactivity
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initTypewriter();
    initStatsCounter();
    initMobileNav();
    initTerminalCLI();
    initContactForm();
});

/* ==========================================================
   1. MATRIX RAIN EFFECT (CANVAS)
   ========================================================== */
function initMatrixRain() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Characters for Matrix stream (hex, katakana, binary, symbols)
    const characters = '0123456789ABCDEF01010101XYZ#@$&*+-/<>=%§';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(7, 10, 15, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff66';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
    });
}

/* ==========================================================
   2. TYPEWRITER EFFECT (DEFENSIVE & SOC FOCUSED)
   ========================================================== */
function initTypewriter() {
    const typewriterElem = document.getElementById('typewriter');
    if (!typewriterElem) return;

    const phrases = [
        "Defensive Cybersecurity & SOC Analyst",
        "Blue Team & Network Security Practitioner",
        "Google Cybersecurity Specialization Scholar",
        "AWS Cloud Infrastructure & Security Enthusiast",
        "TryHackMe Security Enthusiast"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 75;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElem.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typewriterElem.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 75;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================
   3. STAT COUNTERS (INTERSECTION OBSERVER)
   ========================================================== */
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-num');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statCards.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    let count = 0;
                    const duration = 1500;
                    const stepTime = Math.max(Math.floor(duration / (target || 1)), 50);

                    const timer = setInterval(() => {
                        count++;
                        stat.textContent = count;
                        if (count >= target) {
                            clearInterval(timer);
                            stat.textContent = target;
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* ==========================================================
   4. MOBILE NAV TOGGLE
   ========================================================== */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-terminal';
            }
        }
    });

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-terminal';
        });
    });
}

/* ==========================================================
   5. INTERACTIVE TERMINAL SIMULATOR
   ========================================================== */
function initTerminalCLI() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const clearBtn = document.getElementById('clear-term-btn');
    const screen = document.getElementById('terminal-screen');

    if (!form || !input || !output) return;

    let commandHistory = [];
    let historyIndex = -1;

    // Command registry
    const commands = {
        help: () => `
Available Security Commands:
  <span class="highlight">help</span>        - Display all CLI commands
  <span class="highlight">about</span>       - Print Vimukthi's operator identity
  <span class="highlight">certs</span>       - View verified Google & AWS certificates
  <span class="highlight">skills</span>      - List defensive skills & toolset
  <span class="highlight">projects</span>    - List practical security labs & writeups
  <span class="highlight">thm</span>         - Inspect TryHackMe training profile
  <span class="highlight">whoami</span>      - Display current session privilege
  <span class="highlight">contact</span>     - View direct email & network links
  <span class="highlight">scan</span>        - Run simulated defensive network integrity scan
  <span class="highlight">clear</span>       - Clear current console buffer
`,
        about: () => `
[+] OPERATOR: Vimukthi Prabath Koswaththa
[+] SPECIALIZATION: Defensive Cybersecurity & SOC Operations
[+] PASSION: Threat Analysis, System Hardening, Network Defense, Cloud Security
[+] CURRENT WORK: Google Cybersecurity Specialization & TryHackMe Labs
[+] LOCATION: Rathnapura, Sri Lanka
`,
        certs: () => `
Verified Credentials:
  1. Google: Foundations of Cybersecurity
  2. Google: Play It Safe - Manage Security Risks
  3. Google: Connect and Protect - Networks and Network Security
  4. Google: Tools of the Trade - Linux and SQL
  5. AWS: AWS Cloud Technical Essentials
  6. Google: Google AI Essentials
  * Credly Profile: credly.com/users/vimukthi-prabath.7c563d3c
`,
        skills: () => `
[+] DEFENSIVE: SOC Foundations, NIST CSF, SIEM, Incident Response, Log Analysis
[+] NETWORK: TCP/IP, OSI Layers, Firewalls, Wireshark, Port Security, VPN
[+] SYSTEMS: Linux (Bash/Perms), Windows, SQL Queries & Database Defense
[+] CLOUD: AWS IAM Least Privilege, Amazon VPC, S3 Buckets, Cloud Security
`,
        projects: () => `
1. TryHackMe Hands-on Defensive Rooms (Active)
2. Linux System Hardening & SQL Activity Log Analysis (Google Cyber)
3. TCP/IP Packet Inspection & Network Perimeter Defense Lab
4. AWS Secure Infrastructure Architecture (IAM, VPC, S3 Isolation)
`,
        thm: () => `
[+] TRYHACKME PROFILE: https://tryhackme.com/p/vimukthivpk123
[+] STATUS: Actively solving Defensive, Networking & Linux security challenges.
`,
        whoami: () => `
vimukthi@blue-portfolio: uid=1000(vimukthi) gid=1000(soc_analyst)
Location: Rathnapura, Sri Lanka | Clearance: Level-1 Defensive Operator
`,
        contact: () => `
Direct Contact Channels:
  Email: vimukthivpk123@gmail.com
  GitHub: https://github.com/VimukthiPrabath
  LinkedIn: https://www.linkedin.com/in/vimukthi-prabath-koswaththa-4050b7247/
  TryHackMe: https://tryhackme.com/p/vimukthivpk123
  Credly: https://www.credly.com/users/vimukthi-prabath.7c563d3c
`,
        date: () => new Date().toUTCString(),
        sudo: () => `<span class="term-res-info">[i] Sudo access granted. Welcome Vimukthi! All blue team defenses active.</span>`,
        "cat flag.txt": () => `<span class="term-res-success">FLAG{defensive_security_is_the_ultimate_shield_2026}</span>`
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawCmd = input.value.trim();
        if (!rawCmd) return;

        // Save history
        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        addEcho(rawCmd);
        input.value = '';

        const cmd = rawCmd.toLowerCase();

        if (cmd === 'clear') {
            output.innerHTML = '';
            scrollToBottom();
            return;
        }

        if (cmd === 'scan') {
            runPortScanSim();
            return;
        }

        if (commands[cmd]) {
            const result = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
            addResponse(result);
        } else {
            addResponse(`<span class="term-res-error">bash: command not found: "${escapeHTML(rawCmd)}". Type <span class="highlight">help</span> for available commands.</span>`);
        }

        scrollToBottom();
    });

    // Arrow keys for history
    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            output.innerHTML = '';
        });
    }

    function addEcho(cmd) {
        const div = document.createElement('div');
        div.className = 'term-line term-cmd-echo';
        div.innerHTML = `<span class="term-prompt"><span class="user-part">vimukthi@blue-portfolio</span>:<span class="dir-part">~</span>$</span> ${escapeHTML(cmd)}`;
        output.appendChild(div);
    }

    function addResponse(html) {
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = html.trim().replace(/\n/g, '<br>');
        output.appendChild(div);
    }

    function runPortScanSim() {
        addResponse('<span class="term-res-info">[*] Initiating Defensive Security Audit on localhost [127.0.0.1]...</span>');
        scrollToBottom();

        setTimeout(() => {
            addResponse('[*] Analyzing firewall rules & listening sockets...');
            scrollToBottom();
        }, 400);

        setTimeout(() => {
            const scanOutput = `
PORT     STATE    SERVICE       DEFENSE_STATUS
22/tcp   open     ssh           Key-based Auth Only (Hardened)
80/tcp   closed   http          Redirecting to TLS 443
443/tcp  open     https         TLS 1.3 Active (Zero Vulnerabilities)
3306/tcp filtered mysql         Localhost Bound (No external access)
<span class="term-res-success">[+] Defensive Audit Result: Secure. Perimeter protected by Blue Shield.</span>
            `;
            addResponse(scanOutput);
            scrollToBottom();
        }, 1200);
    }

    function scrollToBottom() {
        screen.scrollTop = screen.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

/* ==========================================================
   6. CONTACT FORM SIMULATION
   ========================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ENCRYPTING &amp; TRANSMITTING...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            feedback.className = 'form-feedback success';
            feedback.innerHTML = '<i class="fa-solid fa-shield-check"></i> <strong>TRANSMISSION RECEIVED:</strong> Thank you for your message! Vimukthi will respond via vimukthivpk123@gmail.com shortly.';
            
            form.reset();

            setTimeout(() => {
                feedback.style.display = 'none';
            }, 7000);
        }, 1200);
    });
}
