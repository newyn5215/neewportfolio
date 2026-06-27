// 移动端导航菜单
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP滚动动画
gsap.registerPlugin(ScrollTrigger);

// 首页动画
if (document.querySelector('.featured-item')) {
    // 精选作品动画
    gsap.utils.toArray('.featured-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // 品类导航动画
    gsap.utils.toArray('.category-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15
        });
    });

    // 优势卡片动画
    gsap.utils.toArray('.advantage-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15
        });
    });

    // 关于我部分动画
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 1
    });

    // 合作品牌动画
    gsap.utils.toArray('.brand-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1
        });
    });
}

// 二级页面作品动画
if (document.querySelector('.portfolio-item')) {
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });
}

// 弹窗详情功能
if (document.getElementById('projectModal')) {
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalClient = document.getElementById('modalClient');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');
    const modalCounter = document.getElementById('modalCounter');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    
    let currentImageIndex = 0;
    let currentImages = [];
    
    // 打开弹窗
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectData = JSON.parse(item.getAttribute('data-project'));
            
            // 填充弹窗内容
            modalTitle.textContent = projectData.title;
            modalClient.textContent = `客户：${projectData.client}`;
            modalDate.textContent = `时间：${projectData.date}`;
            modalDescription.textContent = projectData.description;
            
            // 设置图片
            currentImages = projectData.images;
            currentImageIndex = 0;
            updateModalImage();
            
            // 显示弹窗
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭弹窗
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // 点击弹窗外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
        
        // 左右方向键切换图片
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
    
    // 更新图片
    function updateModalImage() {
        modalImage.src = currentImages[currentImageIndex];
        modalCounter.textContent = `${currentImageIndex + 1}/${currentImages.length}`;
    }
    
    // 上一张图片
    function prevImage() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = currentImages.length - 1;
        }
        updateModalImage();
    }
    
    // 下一张图片
    function nextImage() {
        currentImageIndex++;
        if (currentImageIndex >= currentImages.length) {
            currentImageIndex = 0;
        }
        updateModalImage();
    }
    
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
}