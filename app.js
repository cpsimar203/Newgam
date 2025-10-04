
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let sliderInterval;
        let currentGameData = {};
        
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-moon';
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            if (newTheme === 'light') {
                body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            } else {
                body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            }
        });
        
        const tabItems = document.querySelectorAll('.nav-tab');
        const contentSections = document.querySelectorAll('.content-section');
        
        tabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                
                tabItems.forEach(item => item.classList.remove('active'));
                tab.classList.add('active');
                
                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === target) {
                        section.classList.add('active');
                    }
                });
            });
        });
        
        function showSlide(index) {
            if (index < 0) {
                currentSlide = slides.length - 1;
            } else if (index >= slides.length) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            
            const offset = -currentSlide * 100;
            document.getElementById('mainSlider').style.transform = `translateX(${offset}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        function startSlider() {
            sliderInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }
        
        showSlide(0);
        startSlider();
        
        document.querySelector('.prev-slide').addEventListener('click', () => {
            clearInterval(sliderInterval);
            showSlide(currentSlide - 1);
            startSlider();
        });
        
        document.querySelector('.next-slide').addEventListener('click', () => {
            clearInterval(sliderInterval);
            showSlide(currentSlide + 1);
            startSlider();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(sliderInterval);
                showSlide(index);
                startSlider();
            });
        });
        
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const title = card.querySelector('.card-title').innerText.toLowerCase();
                if (title.includes(searchTerm) || searchTerm === '') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        const cards = document.querySelectorAll('.card');
        const detailModal = document.getElementById('detailModal');
        const gameDetailModal = document.getElementById('gameDetailModal');
        const downloadModal = document.getElementById('downloadModal');
        const contentLockerModal = document.getElementById('contentLockerModal');
        const closeModal = document.getElementById('closeModal');
        const downloadBtn = document.getElementById('downloadBtn');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const title = card.querySelector('.card-title').innerText;
                const size = card.querySelector('.card-size').innerText;
                const rating = card.querySelector('.card-rating span').innerText;
                
                const profileImg = card.dataset.profileImg || card.querySelector('.card-image img').src;
                const coverImg = card.dataset.coverImg || card.querySelector('.card-image img').src;
                
                currentGameData = { id, title, profileImg, coverImg, size, rating };
                
                document.getElementById('modalTitle').innerText = title;
                document.getElementById('modalIcon').src = profileImg;
                document.getElementById('modalBanner').src = coverImg;
                document.getElementById('modalSize').innerText = size;
                document.getElementById('modalRating').innerHTML = `<i class="fas fa-star"></i> ${rating}`;
                
                detailModal.style.display = 'flex';
                gameDetailModal.style.display = 'block';
                downloadModal.style.display = 'none';
                contentLockerModal.style.display = 'none';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', () => {
            detailModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                detailModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        downloadBtn.addEventListener('click', () => {
            gameDetailModal.style.display = 'none';
            downloadModal.style.display = 'block';
            
            let progress = 0;
            const progressCircle = document.getElementById('progressCircle');
            const progressPercentage = document.getElementById('progressPercentage');
            const progressStatus = document.getElementById('progressStatus');
            const downloadMessage = document.getElementById('downloadMessage');
            
            const interval = setInterval(() => {
                progress += Math.random() * 3 + 1;
                if (progress > 100) progress = 100;
                
                const displayProgress = Math.floor(progress);
                progressPercentage.innerText = `${displayProgress}%`;
                progressCircle.style.background = `conic-gradient(var(--primary-color) ${displayProgress * 3.6}deg, var(--border-color) 0deg)`;
                
                // Update status messages based on progress
                // if (progress < 20) {
                //     progressStatus.innerText = 'Initializing download...';
                //     downloadMessage.innerText = 'Preparing your download files...';
                // } else if (progress < 40) {
                //     progressStatus.innerText = 'Checking device compatibility...';
                //     downloadMessage.innerText = 'Verifying your device specifications...';
                // } else if (progress < 60) {
                //     progressStatus.innerText = 'Setting up MOD features...';
                //     downloadMessage.innerText = 'Preparing modified game features...';
                // } else if (progress < 80) {
                //     progressStatus.innerText = 'Optimizing for your device...';
                //     downloadMessage.innerText = 'Optimizing game performance...';
                // } else if (progress < 100) {
                //     progressStatus.innerText = 'Finalizing installation...';
                //     downloadMessage.innerText = 'Almost ready! Just a few more seconds...';
                // } else {
                //     progressStatus.innerText = 'Download Complete!';
                //     downloadMessage.innerText = 'Your game is ready! Complete the verification below.';
                // }
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        showContentLocker();
                    }, 1500);
                }
            }, 100);
        });

        function showContentLocker() {
            downloadModal.style.display = 'none';
            contentLockerModal.style.display = 'block';
            
            document.getElementById('lockerGameIcon').src = currentGameData.profileImg;
            document.getElementById('lockerGameTitle').innerText = currentGameData.title;
            
            try {
                if (typeof _Tu === 'function') {
                    console.log('Content locker initialized');
                } else {
                    console.log('Content locker script not loaded yet');
                }
            } catch (error) {
                console.log('Error initializing content locker:', error);
            }
        }

        function onContentLockerComplete() {
            alert('Verification completed! Your download will start now.');
            detailModal.style.display = 'none';
            document.body.style.overflow = '';
        }

        contentLockerModal.addEventListener('click', (e) => {
            if (e.target === contentLockerModal) {
                detailModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
